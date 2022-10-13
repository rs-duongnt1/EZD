import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { OrganizationService } from './organization.service';

@Controller('orgs')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  async listOrgs(@Req() req: Request) {
    const result = await this.organizationService.getListOrgs(
      req.cookies.access_token,
    );
    return result.data;
  }

  @Get(':org/repos')
  async getListRepos(@Req() req: Request) {
    const result = await this.organizationService.getListRepo(
      req.cookies.access_token,
      req.params.org,
    );
    return result.data;
  }

  @Post()
  async createOrg(@Body() body, @Req() req) {
    const result = await this.organizationService.createOrg(
      req.cookies.access_token,
      body,
    );
    return result.data;
  }
}
