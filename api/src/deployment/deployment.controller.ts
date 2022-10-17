import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { DeploymentService } from './deployment.service';
import { Deployment } from './deployment.entity';
import { RepositoryService } from 'src/repository/repository.service';

@Controller('deployments')
export class DeploymentController {
  constructor(
    @InjectQueue('deployment') private deploymentQueue: Queue,
    private deploymentService: DeploymentService,
    private repositoryService: RepositoryService,
  ) {}

  @Get()
  async findAllDeployment(@Query() query, @Req() req) {
    const repoResult = await this.repositoryService.getRepo(
      req.cookies.access_token,
      query,
    );
    return this.deploymentService.findAllDeployments({
      projectId: repoResult.data.id,
    });
  }

  @Post()
  async createDeployment(@Body() body) {
    console.log(body);
    const dataInsert = new Deployment();
    dataInsert.projectId = body.repository.id;
    dataInsert.state = 'QUEUE';
    dataInsert.target = 'development';
    dataInsert.head_commit = {
      id: body.head_commit.id,
      message: body.head_commit.message,
      timestamp: body.head_commit.timestamp,
    };

    dataInsert.author = body.head_commit.author;

    dataInsert.committer = body.head_commit.committer;
    dataInsert.ref = body.ref;

    const deployment = await this.deploymentService.createDeployment(
      dataInsert,
    );

    return this.deploymentQueue.add('building', {
      deployment,
      repository: body.repository,
    });

  }
}
