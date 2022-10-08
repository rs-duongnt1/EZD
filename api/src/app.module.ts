import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [HttpModule],
  controllers: [
    AppController,
    AuthController,
    OrganizationController,
    UserController,
    RepositoryController,
  ],
  providers: [AppService, UserService, OrganizationService, RepositoryService],
})
export class AppModule {}
