import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
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
}
