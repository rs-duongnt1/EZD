import { Controller, Get, Param, Query, Req } from '@nestjs/common';
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
  async getCommits(@Param() params, @Req() req, @Query() query) {
    const repoResult = await this.repositoryService.getCommits(
      req.cookies.access_token,
      params,
      query,
    );

    return repoResult.data;
  }

  @Get(':org/:repo/contents')
  async getFileContents(@Param() params, @Req() req, @Query() query) {
    if (!query.filePath) {
      const repoResult = await this.repositoryService.getFileContents(
        req.cookies.access_token,
        params,
      );

      return repoResult.data;
    } else {
      const repoResult = await this.repositoryService.getContentByFilePath(
        req.cookies.access_token,
        {
          org: params.org,
          repo: params.repo,
          filePath: query.filePath,
        },
      );

      return repoResult.data;
    }
  }
}
