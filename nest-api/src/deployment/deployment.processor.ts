import { DeploymentStatus } from './../core/enums/deployment-status';
import { ProjectService } from './../project/project.service';
import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { join } from 'path';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { Project } from '../project/project.schema';
import * as fsExtra from 'fs-extra';
import { spawn } from 'child_process';

@Processor('deployment')
export class DeploymentProcessor {
  constructor(private projectService: ProjectService) {}
  private readonly logger = new Logger(DeploymentProcessor.name);
  private _postReceiveTemplatePath = join(
    __dirname,
    '../../hooks_template/post-receive.template',
  );
  private _prePushScriptPath = join(__dirname, '../../', 'scripts', 'pre-push');

  private _getBareRepositoryPath(project: Project) {
    return join(process.env.GIT_BARE_PATH, project.org, `${project.name}.git`);
  }

  private _getRepositoryPath(project: Project) {
    return join(process.env.GIT_REPOSITORY_PATH, project.org, project.name);
  }

  private _getSourceTemplatePath(project: Project) {
    return join(__dirname, '../../', `source_templates/${project.framework}`);
  }

  @Process('create-git-bare')
  async createGitBare(job: Job) {
    const project = job.data;
    await this.projectService.updateById(project._id, {
      status: DeploymentStatus.CREATING_GIT_REPO,
    });
    await this._createGitBareRepository(project);
    await this._createGitRepository(project);

    // const content = readFileSync(postReceiveTemplatePath, 'utf-8');

    // const template = compile(content);

    // const contents = template({
    //   repositoryPath: repositoryPath,
    //   bareRepositoryPath: bareRepositoryPath,
    //   prePushScript: prePushScriptPath,
    // });

    // writeFileSync(join(bareRepositoryPath, 'hooks', 'post-receive'), contents);
    // chmodr(join(bareRepositoryPath, 'hooks', 'post-receive'), 0o755);
  }

  @OnQueueCompleted({
    name: 'create-git-bare',
  })
  async building(job: Job) {
    const project = job.data;
    await this.projectService.updateById(project._id, {
      status: DeploymentStatus.BUILDING,
    });
    const child = spawn('yarn', {
      cwd: join(process.env.GIT_REPOSITORY_PATH, project.org, project.name),
      stdio: 'pipe',
    });

    child.stdout.on('data', (data) => {
      console.log('stdout: ' + data.toString());
    });
    child.on('close', () => {
      const child = spawn('yarn', ['build'], {
        cwd: join(process.env.GIT_REPOSITORY_PATH, project.org, project.name),
        stdio: 'pipe',
      });

      child.stdout.on('data', (data) => {
        console.log('stdout: ' + data.toString());
      });

      child.on('close', () => {
        this.projectService
          .updateById(project._id, {
            status: DeploymentStatus.READY,
          })
          .then((_) => {
            this.logger.log('Ready');
          });
      });
    });
    // const content = readFileSync(postReceiveTemplatePath, 'utf-8');
  }

  async _createGitBareRepository(project: Project) {
    this.logger.debug('Create folder bare repository...');
    mkdirSync(this._getBareRepositoryPath(project), {
      recursive: true,
    });

    this.logger.debug('Git init --bare');
    const options: Partial<SimpleGitOptions> = {
      baseDir: this._getBareRepositoryPath(project),
      binary: 'git',
      maxConcurrentProcesses: 6,
      trimmed: false,
    };
    const git: SimpleGit = simpleGit(options);

    await git.init(true);
  }

  async _createGitRepository(project: Project) {
    mkdirSync(this._getRepositoryPath(project), {
      recursive: true,
    });

    const git: SimpleGit = simpleGit({
      baseDir: this._getRepositoryPath(project),
      binary: 'git',
      maxConcurrentProcesses: 6,
      trimmed: false,
    });

    await git.init();

    await git.addRemote('origin', this._getBareRepositoryPath(project));

    fsExtra.copySync(
      this._getSourceTemplatePath(project),
      this._getRepositoryPath(project),
    );

    await git.add('*');

    await git.commit('Initial commit');

    await git.push(['origin', 'master', '-f']);
  }
}
