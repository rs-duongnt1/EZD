import { UserService } from './../user.service';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('accessToken:', req.cookies.access_token);
      const userResult = await this.userService.getUserByAccessToken(
        req.cookies.access_token,
      );

    
      req['user'] = userResult.data;
      next();
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
