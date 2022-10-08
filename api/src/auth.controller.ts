import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body, @Res({ passthrough: true }) response: Response) {
    const { username, password } = body;
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    const userResult = await this.userService.getUserByToken(token);
    const user = userResult.data;
    const accessTokenResult = await this.userService.createAccessToken(
      token,
      user.username,
      'accessToken_' + new Date().getTime(),
    );
    const accessToken = accessTokenResult.data;
    response.cookie('access_token', accessToken.sha1, { httpOnly: true });
    return user;
  }
}
