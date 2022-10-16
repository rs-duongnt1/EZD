import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Deployment } from 'src/entities/deployment.entity';
import { DeploymentService } from '../services/deployment.service';

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
    const dataInsert = new Deployment();
    dataInsert.projectId = 'xxxxx';
    dataInsert.url = 'yyyyyyyyyyyyyyyyy.yyy';
    dataInsert.state = 'BUILDING';
    await this.deploymentService.createDeployment(dataInsert);
    console.log('startBuilding');
  }
}
