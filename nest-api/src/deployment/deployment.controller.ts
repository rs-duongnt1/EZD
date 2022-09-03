import { ProjectService } from './../project/project.service';
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Controller('deployments')
export class DeploymentController {
  constructor(
    private projectService: ProjectService,
    @InjectQueue('deployment') private deploymentQueue: Queue,
  ) {}
  @Post()
  async index(@Body() body) {
    const project = await this.projectService.findById(body.project_id);
    this.deploymentQueue.add('create-git-bare', project);
    this.deploymentQueue.add('create-git-repository', project);
    return project;
  }

  @Get(':projectId')
  findByProjectId(@Param() param) {
    return this.projectService.findById(param.projectId);
  }
}
