import { ITeamResponse } from './interfaces/team-response.interface';
import { ITeamSearchParams } from './interfaces/team-search-params.interface';
import { ITeamSearchResponse } from './interfaces/team-search-response.interface';
import { TeamService } from './services/team.service';
import { ITeamCreateResponse } from './interfaces/team-create-response.interface';
import { ITeam } from './interfaces/team.interface';
import { MessagePattern } from '@nestjs/microservices';
import { Controller, HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Controller()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @MessagePattern('team_search')
  async teamSearch(params: ITeamSearchParams): Promise<ITeamSearchResponse> {
    const teams = await this.teamService.search(params);
    const searchTotal = await this.teamService.searchCount(params);

    return {
      status: HttpStatus.OK,
      message: 'team_search_success',
      data: {
        teams,
        total: searchTotal,
      },
    };
  }

  @MessagePattern('team_get_by_slug')
  async teamGetBySlug(slug: string): Promise<ITeamResponse> {
    const team = await this.teamService.findBySlug(slug);

    if (!team) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'team_not_found',
        team: null,
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'team_get_success',
      team: team,
    };
  }

  @MessagePattern('team_get_by_id')
  async teamGetById(id: string): Promise<ITeamResponse> {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'team_id_invalid',
        team: null,
      };
    }

    const team = await this.teamService.findById(id);

    if (!team) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'team_not_found',
        team: null,
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'team_get_success',
      team: team,
    };
  }

  @MessagePattern('team_create')
  async teamCreate(teamBody: ITeam) {
    let result: ITeamCreateResponse;
    if (teamBody) {
      try {
        const teamWithSlug = await this.teamService.findBySlug(teamBody.slug);
        if (teamWithSlug) {
          result = {
            status: HttpStatus.CONFLICT,
            message: 'team_create_conflict_slug',
            data: null,
            errors: null,
          };
        } else {
          const team = await this.teamService.createTeam(teamBody);
          result = {
            status: HttpStatus.CREATED,
            message: 'team_create_success',
            data: {
              team: team,
            },
            errors: null,
          };
        }
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'team_create_precondition_failed',
          data: null,
          errors: e.errors,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'team_create_bad_request',
        data: null,
        errors: null,
      };
    }

    return result;
  }
}
