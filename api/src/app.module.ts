import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [HttpModule],
  controllers: [
    AppController,
    AuthController,
    OrganizationController,
    UserController,
  ],
  providers: [AppService, UserService, OrganizationService],
})
export class AppModule {}