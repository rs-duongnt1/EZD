import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RepositoryService } from './repository.service';

@Controller('repos')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  async listRepos(@Req() req: Request) {
    const { access_token } = req.cookies;
    const reposResult = await this.repositoryService.getListRepos(access_token);

    return reposResult.data;
  }
}
