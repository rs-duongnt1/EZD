import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { exec, execSync } from 'child_process';
import { join } from 'path';
import { Deployment } from 'src/entities/deployment.entity';
import { DeploymentService } from '../services/deployment.service';
import { Logger } from '@nestjs/common';
@Processor({
  name: 'deployment',
})
export class DeploymentProcessor {
  constructor(private deploymentService: DeploymentService) {}
  @Process({
    name: 'building',
    concurrency: 3,
  })
  async startBuilding(job: Job) {
    const { deployment, repository } = job.data as {
      deployment: Deployment;
      repository: any;
    };

    console.log(repository);

    try {
      Logger.log('Initalize....', 'deployment');

      await this.deploymentService.updateDeployment(deployment.id, {
        state: 'BUILDING',
        buildingAt: new Date(),
      } as Deployment);

      const clone_url = repository.clone_url.replace(
        'localhost:4444',
        'git_server:3000',
      );

      const uniqueHash = this.makeUniqueId(8);

      const buildPath = join(
        '/var/www/builds',
        repository.full_name,
        uniqueHash,
      );

      await execSync(`mkdir -p ${buildPath}`);

      Logger.log('Cloning....', 'deployment');

      await execSync(`git clone ${clone_url} ${buildPath}`, {
        cwd: buildPath,
      });

      Logger.log('Installing dependencies....', 'deployment');

      await execSync(`yarn`, {
        cwd: buildPath,
      });

      Logger.log('Building....', 'deployment');

      await execSync(`yarn build`, {
        cwd: buildPath,
      });

      await this.deploymentService.updateDeployment(deployment.id, {
        state: 'READY',
        readyAt: new Date(),
      } as Deployment);

      await this.deploymentService.updateDeployment(deployment.id, {
        url: `${repository.name}-${uniqueHash}-${repository.owner.username}.rsdn.site`,
      } as Deployment);
    } catch (err) {
      console.error(err);
      await this.deploymentService.updateDeployment(deployment.id, {
        state: 'ERROR',
      } as Deployment);
    }
  }

  makeUniqueId(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
