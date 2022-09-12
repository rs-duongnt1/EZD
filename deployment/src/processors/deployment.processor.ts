import { join } from 'path';
import { DeploymentService } from './../services/deployment.service';
import { SimpleGitOptions, simpleGit, SimpleGit } from 'simple-git';
import { IProject } from '../interfaces/project.interface';
import { Processor, Process, OnQueueCompleted } from '@nestjs/bull';
import { Job } from 'bull';
import { ITeam } from '../interfaces/team.interface';
import { IDeployment } from '../interfaces/deployment.interface';
import { spawn, exec } from 'child_process';
import { Logger } from '@nestjs/common';
import { promisify } from 'util';
import { randomBytes, randomUUID } from 'crypto';

@Processor('deployment')
export class DeploymentProcessor {
  constructor(private deploymentService: DeploymentService) {}
  @Process('building')
  async building(job: Job) {
    const { project, team, deployment } = job.data as {
      project: IProject;
      team: ITeam;
      deployment: IDeployment;
    };
    try {
      Logger.log('Build starting');

      const deploymentPath = `/var/www/source-deployments`;

      const domainName = `${randomBytes(10).toString('hex')}-${project.slug}-${
        team.slug
      }.${process.env.APP_ROOT_DOMAIN}`;

      const gitBarePath = `/data/bare_repositories/${project.gitUri}`;

      await this.deploymentService.updateById(deployment._id, {
        state: 'BUILDING',
      } as IDeployment);

      Logger.log(`Cloning project...`);
      const execAsync = promisify(exec);

      await execAsync(`git clone ${gitBarePath} ${domainName}`, {
        cwd: deploymentPath,
      });

      Logger.log('Install dependencies....');
      const child = spawn('npm', ['install'], {
        cwd: join(deploymentPath, domainName),
        stdio: 'pipe',
        shell: true,
      });

      child.stdout.on('data', async (data) => {
        console.log('stdout: ' + data.toString());
      });

      child.on('error', (error) => {
        console.error(error.toString());
      });
      child.on('close', () => {
        Logger.log('Building...');
        const child = spawn('npm', ['run', 'build'], {
          cwd: join(deploymentPath, domainName),
          stdio: 'pipe',
        });
        child.stdout.on('data', async (data) => {
          console.log('stdout: ' + data.toString());
        });
        child.on('close', async () => {
          await this.deploymentService.updateById(deployment._id, {
            state: 'READY',
          } as IDeployment);
          await this._assignDomain(deployment, domainName);

          Logger.log('cleaning...');

          await execAsync(`ls --hide=dist | xargs -d '\n' rm -rf`, {
            cwd: join(deploymentPath, domainName),
          });

          Logger.log('Build ended');
        });
      });
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
}
