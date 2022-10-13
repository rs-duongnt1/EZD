import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async userInfo(@Req() req: Request) {
    const userReposRes = await this.userService.getListRepo(
      req.cookies.access_token,
    );
    return {
      ...req['user'],
      repos: userReposRes.data,
    };
  }
}
