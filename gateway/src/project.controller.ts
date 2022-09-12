import { IProjectListResponse } from './interfaces/project/project-list-response.interface';
import { ITeamResponse } from './interfaces/team/team-response.interface';
import { firstValueFrom } from 'rxjs';
import {
  Controller,
  Get,
  Inject,
  Post,
  Body,
  Param,
  Query,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { IProjectResponse } from './interfaces/project/project-response.interface';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(
    @Inject('PROJECT_SERVICE')
    private readonly projectServiceClient: ClientProxy,
    @Inject('TEAM_SERVICE')
    private readonly teamServiceClient: ClientProxy,
  ) {}

  @Get()
  async findAll(@Query() query): Promise<IProjectListResponse> {
    if (!query.teamId) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'project_search_team_not_found',
        data: null,
        errors: null,
      };
    }
    const projects: IProjectListResponse = await firstValueFrom(
      this.projectServiceClient.send('project_search', {
        teamId: query.teamId,
        slug: query.slug,
      }),
    );

    return projects;
  }

  @Get('detail')
  async detail(@Query() query) {
    return await this.projectServiceClient.send('project_detail', {
      teamId: query.teamId,
      slug: query.slug,
    });
  }

  @Get(':id')
  async findById(@Param() param) {
    return await this.projectServiceClient.send('project_find_by_id', param.id);
  }

  @Post()
  async createProject(@Body() projectBody) {
    if (!projectBody.teamId) {
      throw new NotFoundException('Team not found');
    }
    const teamResponse: ITeamResponse = await firstValueFrom(
      this.teamServiceClient.send('team_get_by_id', projectBody.teamId),
    );

    if (teamResponse.status !== HttpStatus.OK) {
      throw new NotFoundException('Team not found');
    }

    const projectResponse: IProjectResponse = await firstValueFrom(
      this.projectServiceClient.send('project_create', {
        projectBody: projectBody,
        team: teamResponse.team,
      }),
    );

    if (projectResponse.status !== HttpStatus.CREATED) {
      return projectResponse;
    }

    return projectResponse;
  }
}
