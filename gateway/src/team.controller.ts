import { firstValueFrom } from 'rxjs';
import { ITeamSearchQuery } from './interfaces/project/team-search-query.interface';
import { Controller, Get, Inject, Body, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(
    @Inject('TEAM_SERVICE') private readonly teamServiceClient: ClientProxy,
    @Inject('CADDY_SERVICE') private readonly nginxServiceClient: ClientProxy,
  ) {}

  @Get()
  async findAll(@Query() query: ITeamSearchQuery) {
    return await this.teamServiceClient.send('team_search', query);
  }

  @Post()
  async create(@Body() teamBody) {
    return await this.teamServiceClient.send('team_create', teamBody);
  }
}
