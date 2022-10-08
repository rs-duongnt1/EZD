import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async userInfo(@Body() body, @Req() req: Request) {
    console.log(req.cookies);
    const userRes = await this.userService.getUserByAccessToken(
      req.cookies.access_token,
    );

    const userReposRes = await this.userService.getListRepo(
      req.cookies.access_token,
    );
    return {
      ...userRes.data,
      repos: userReposRes.data,
    };
  }
}
