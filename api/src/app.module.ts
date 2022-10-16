import { WebhookModule } from './webhook/webhook.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { OrganizationModule } from './organization/organization.module';
import { HttpModule } from '@nestjs/axios';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { RepositoryModule } from './repository/repository.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { DeploymentModule } from './deployment/deployment.module';

@Module({
  imports: [
    HttpModule,
    RepositoryModule,
    OrganizationModule,
    WebhookModule,
    DeploymentModule,
    // ConfigModule.forRoot(),
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('orgs');
    consumer.apply(AuthMiddleware).forRoutes('user');
    consumer.apply(AuthMiddleware).forRoutes('repos');
  }
}
