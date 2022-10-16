import { Controller, Get, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('deployments')
export class DeploymentController {
  constructor(@InjectQueue('deployment') private deploymentQueue: Queue) {}

  @Get()
  createDeployment() {
    return this.deploymentQueue.add('building', { name: 'teoduong....' });
  }
}
