import { Controller, Get, Param, Req } from '@nestjs/common';
import { RepositoryService } from './repository.service';

@Controller('repos')
export class RepositoryController {
  constructor(private repositoryService: RepositoryService) {}
  @Get(':org/:repo')
  async getRepo(@Param() params, @Req() req) {
    const repoResult = await this.repositoryService.getRepo(
      req.cookies.access_token,
      params,
    );

    return repoResult.data;
  }

  @Get(':org/:repo/commits')
  async getCommits(@Param() params, @Req() req) {
    const repoResult = await this.repositoryService.getCommits(
      req.cookies.access_token,
      params,
    );

    return repoResult.data;
  }

  @Get(':org/:repo/contents')
  async getFileContents(@Param() params, @Req() req) {
    const repoResult = await this.repositoryService.getFileContents(
      req.cookies.access_token,
      params,
    );

    return repoResult.data;
  }

  @Get(':org/:repo/contents/*')
  async getContentByFilepath(@Param() params, @Req() req) {
    const repoResult = await this.repositoryService.getContentByFilePath(
      req.cookies.access_token,
      {
        org: params.org,
        repo: params.repo,
        filePath: params['0'],
      },
    );

    return repoResult.data;
  }
}
