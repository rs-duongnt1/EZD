import { IProjectDetailResponse } from './interfaces/project-detail-response.interface';
import { IProjectDetailParams } from './interfaces/project-detail-params.interface';
import { IProjectCreateResponse } from './interfaces/project-create-response.interface';
import { ProjectService } from './services/project.service';
import { MessagePattern } from '@nestjs/microservices';
import { Controller, HttpStatus } from '@nestjs/common';
import { IProject } from './interfaces/project.interface';
import { IProjectFindById } from './interfaces/project-find-by-id.interface';
import * as mongoose from 'mongoose';
import { IProjectSearch } from './interfaces/project-search.interface';
import { ITeam } from './interfaces/team.interface';
@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern('project_search')
  async projectFindAll(searchFilter: any): Promise<IProjectSearch> {
    const projects = await this.projectService.findAll(searchFilter);
    const totalProjects = await this.projectService.getTotalProjects(
      searchFilter,
    );

    return {
      status: 200,
      message: 'project_search_success',
      data: {
        projects: projects,
        total: totalProjects,
      },
    };
  }

  @MessagePattern('project_create')
  async projectCreate({
    projectBody,
    team,
  }: {
    projectBody: IProject;
    team: ITeam;
  }) {
    let result: IProjectCreateResponse;
    if (projectBody) {
      try {
        const projectBySlug = await this.projectService.findBySlugAndTeamId(
          projectBody.slug,
          projectBody.teamId,
        );
        if (projectBySlug) {
          result = {
            status: HttpStatus.CONFLICT,
            message: 'project_create_conflict_slug',
            data: null,
            errors: null,
          };
        } else {
          projectBody.status = 'READY';
          projectBody.gitUri = `${team.slug}/${projectBody.slug}.git`;
          const project = await this.projectService.createProject(projectBody);
          result = {
            status: HttpStatus.CREATED,
            message: 'project_create_success',
            data: {
              project,
            },
            errors: null,
          };
        }
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'project_create_precondition_failed',
          data: null,
          errors: e.errors,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'project_create_bad_request',
        data: null,
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern('project_find_by_name')
  async projectFindByName(name: string) {
    return this.projectService.findByName(name);
  }

  @MessagePattern('project_detail')
  async projectDetail(
    params: IProjectDetailParams,
  ): Promise<IProjectDetailResponse> {
    console.log('searching..');
    const project = await this.projectService.findBySlugAndTeamId(
      params.slug,
      params.teamId,
    );
    return {
      status: HttpStatus.OK,
      data: {
        project,
      },
      message: 'project_detail_success',
      errors: null,
    };
  }

  @MessagePattern('project_get_by_id')
  async projectFindById(id: string): Promise<IProjectFindById> {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'project_invalid_id',
        data: null,
        errors: null,
      };
    }
    const project = await this.projectService.findById(id);

    if (project) {
      return {
        status: HttpStatus.OK,
        message: 'project_find_success',
        data: {
          project: project,
        },
        errors: null,
      };
    }

    return {
      status: HttpStatus.NOT_FOUND,
      message: 'project_not_found',
      data: null,
      errors: null,
    };
  }
}
