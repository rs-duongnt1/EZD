import { DeploymentController } from './deployment.controller';
import { TeamController } from './team.controller';
import { ProjectController } from './project.controller';
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [ProjectController, TeamController, DeploymentController],
  providers: [
    AppService,
    {
      provide: 'DEPLOYMENT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          options: {
            host: process.env.DEPLOYMENT_SERVICE_HOST,
            port: Number(process.env.DEPLOYMENT_SERVICE_PORT),
          },
          transport: Transport.TCP,
        });
      },
    },
    {
      provide: 'PROJECT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          options: {
            host: process.env.PROJECT_SERVICE_HOST,
            port: Number(process.env.PROJECT_SERVICE_PORT),
          },
          transport: Transport.TCP,
        });
      },
    },
    {
      provide: 'TEAM_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          options: {
            host: process.env.TEAM_SERVICE_HOST,
            port: Number(process.env.TEAM_SERVICE_PORT),
          },
          transport: Transport.TCP,
        });
      },
    },
    {
      provide: 'CADDY_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          options: {
            host: process.env.CADDY_SERVICE_HOST,
            port: Number(process.env.CADDY_SERVICE_PORT),
          },
          transport: Transport.TCP,
        });
      },
    },
  ],
})
export class AppModule {}
