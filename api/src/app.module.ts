import { OrganizationModule } from './organization/organization.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { RepositoryModule } from './repository/repository.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [HttpModule, RepositoryModule, OrganizationModule],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
