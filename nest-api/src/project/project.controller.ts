import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Post()
  async createProject(@Body() createProject: CreateProjectDto) {
    const project = await this.projectService.findByName(createProject.name);
    if (project) {
      throw new BadRequestException('Project name is exists');
    }

    return this.projectService.create(createProject);
  }

  @Get('truncate')
  async truncateAll() {
    return this.projectService.deleteAll();
  }
}
