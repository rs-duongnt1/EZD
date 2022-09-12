import {
  writeFileSync,
  createWriteStream,
  readFileSync,
  mkdirSync,
  existsSync,
} from 'fs';
import { SimpleGitOptions, simpleGit, SimpleGit } from 'simple-git';
import { join } from 'path';
import { DeploymentService } from './../services/deployment.service';
import { IProject } from '../interfaces/project.interface';
import { Processor, Process, OnQueueCompleted } from '@nestjs/bull';
import { Job } from 'bull';
import { ITeam } from '../interfaces/team.interface';
import { IDeployment } from '../interfaces/deployment.interface';
import { exec, spawnSync } from 'child_process';
import { Logger, Scope } from '@nestjs/common';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
const execAsync = promisify(exec);

@Processor({
  name: 'deployment',
  scope: Scope.DEFAULT,
})
export class DeploymentProcessor {
  constructor(private deploymentService: DeploymentService) {}
  @Process({
    name: 'building',
    concurrency: 3,
  })
  async building(job: Job) {
    const { project, team, deployment } = job.data as {
      project: IProject;
      team: ITeam;
      deployment: IDeployment;
    };
    Logger.log('Build starting', 'Building');
    const gitBarePath = `/var/www/bare_repositories/${project.gitUri}`;

    if (!existsSync(gitBarePath)) {
      await this.createGitBareRepository({ team, project });
    }
    Logger.log('Create bare repo successfully', 'Building');
    try {
      const buildPath = `/var/www/builds`;

      const domainName = `${randomBytes(10).toString('hex')}-${project.slug}-${
        team.slug
      }.${process.env.APP_ROOT_DOMAIN}`;

      await this.deploymentService.updateById(deployment._id, {
        state: 'BUILDING',
        buildingAt: new Date().getTime(),
      } as IDeployment);

      Logger.log(`Cloning project...`);

      await execAsync(`git clone ${gitBarePath} ${domainName}`, {
        cwd: buildPath,
      });

      await execAsync(`npm config set -g production false`, {
        cwd: join(buildPath, domainName),
      });

      await this._installDependencies(join(buildPath, domainName));
      await this._building(join(buildPath, domainName));
      await this.deploymentService.updateById(deployment._id, {
        state: 'READY',
        readyAt: new Date().getTime(),
      } as IDeployment);
      await this._assignDomain(deployment, domainName);

      Logger.log('cleaning...');

      const output = await execAsync('ls -al');
      console.log(output);

      await execAsync(`ls --hide=dist | xargs -d '\n' rm -rf`, {
        cwd: join(buildPath, domainName),
      });

      Logger.log('Build ended');
    } catch (err) {
      await this.deploymentService.updateById(deployment._id, {
        state: 'ERROR',
      } as IDeployment);
      console.error(err);
    }
  }

  private async _assignDomain(deployment: IDeployment, domain: string) {
    Logger.log('Assign domain');
    await this.deploymentService.updateById(deployment._id, {
      url: domain,
    } as IDeployment);
  }

  private async _installDependencies(cwd: string) {
    Logger.log('Install dependencies....');
    return new Promise((resolve) => {
      const child = spawnSync('npm', ['install'], {
        cwd,
        shell: true,
        stdio: ['inherit', 'pipe'],
      });

      if (child.status !== 0) {
        throw new Error(child.stderr.toString());
      } else {
        resolve(true);
      }
    });
  }

  private async _building(cwd: string) {
    Logger.log('Building....');
    return new Promise((resolve) => {
      const child = spawnSync('npm', ['run', 'build'], {
        cwd: cwd,
        shell: true,
        stdio: ['inherit', 'pipe'],
      });

      if (child.status !== 0) {
        throw new Error(child.stderr.toString());
      } else {
        resolve(true);
      }
    });
  }

  async createGitBareRepository({
    team,
    project,
  }: {
    team: ITeam;
    project: IProject;
  }) {
    Logger.log('Create git bare repository');
    const gitPath = `/var/www/bare_repositories/${team.slug}/${project.slug}.git`;
    mkdirSync(gitPath, {
      recursive: true,
    });

    const options: Partial<SimpleGitOptions> = {
      baseDir: gitPath,
      binary: 'git',
      maxConcurrentProcesses: 6,
      trimmed: false,
    };
    const git: SimpleGit = simpleGit(options);
    await git.init(true);

    const gitWorkTree = join(
      '/var/src/deployment',
      `source_templates/${project.framework}`,
    );

    const gitWorkTreeCommand = `GIT_WORK_TREE=${gitWorkTree} git --git-dir="${gitPath}"`;
    await execAsync(`${gitWorkTreeCommand} add .`);
    await execAsync(`${gitWorkTreeCommand} commit -am "Initial commit"`);

    // create hook post-receive
    const postReceiveTemplate = readFileSync(
      join(__dirname, '../../', 'script_templates', 'post-receive.template'),
      'utf-8',
    );

    await writeFileSync(
      join(gitPath, 'hooks', 'post-receive'),
      postReceiveTemplate,
      {
        mode: 0o777,
      },
    );

    // create metadata
    writeFileSync(
      join(gitPath, 'metadata.json'),
      JSON.stringify({ teamId: team._id, projectId: project._id }, null, 4),
    );
  }
}
