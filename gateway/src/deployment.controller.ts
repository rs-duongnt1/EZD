import { IDeploymentResponse } from './interfaces/deployment/deployment-response.interface';
import { ITeamResponse } from './interfaces/team/team-response.interface';
import { IProjectResponse } from './interfaces/project/project-response.interface';
import { firstValueFrom } from 'rxjs';
import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('deployments')
@Controller('deployments')
export class DeploymentController {
  constructor(
    @Inject('DEPLOYMENT_SERVICE')
    private readonly deploymentServiceClient: ClientProxy,
    @Inject('PROJECT_SERVICE')
    private readonly projectServiceClient: ClientProxy,
    @Inject('TEAM_SERVICE')
    private readonly teamServiceClient: ClientProxy,
  ) {}

  @Post()
  async deployment(@Body() body) {
    if (!body.projectId) {
      throw new NotFoundException('Project not found');
    }

    const projectResponse: IProjectResponse = await firstValueFrom(
      this.projectServiceClient.send('project_get_by_id', body.projectId),
    );

    if (projectResponse.status !== HttpStatus.OK) {
      throw new NotFoundException('Project not found');
    }

    if (!projectResponse.data.project.teamId) {
      throw new NotFoundException('Team not found');
    }

    const teamResponse: ITeamResponse = await firstValueFrom(
      this.teamServiceClient.send(
        'team_get_by_id',
        projectResponse.data.project.teamId,
      ),
    );

    if (teamResponse.status !== HttpStatus.OK) {
      throw new NotFoundException('Team not found');
    }

    const deploymentResponse: IDeploymentResponse = await firstValueFrom(
      this.deploymentServiceClient.send('deployment_create', {
        projectId: body.projectId,
      }),
    );

    await firstValueFrom(
      this.deploymentServiceClient.send('deployment_processor_added', {
        team: teamResponse.team,
        project: projectResponse.data.project,
        deployment: deploymentResponse.data.deployment,
      }),
    );
    return deploymentResponse;
  }

  @Get(':id')
  async getById(@Param() param: { id: string }) {
    return this.deploymentServiceClient.send('deployment_get_by_id', param.id);
  }

  @Get()
  async deploymentSearch(@Query() query) {
    console.log('deployment_search');
    return this.deploymentServiceClient.send('deployment_search', query);
  }
}
