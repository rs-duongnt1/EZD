import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
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

  @Post()
  async createRepo(@Body() body, @Req() req) {
    const { org, repo, template } = body;
    const user = req['user'];

    const migrateReporesult = await this.repositoryService.migrateRepo(
      req.cookies.access_token,
      {
        org,
        repo,
        clone_addr: 'https://github.com/vuejs-example-apps/vue-starter',
        service: 'github',
        uid: user.id,
      },
    );

    const createHookResult = await this.repositoryService.createHook(
      req.cookies.access_token,
      {
        org,
        repo,
        url: 'http://api:3000/deployments',
      },
    );

    return createHookResult.data;
  }
}
