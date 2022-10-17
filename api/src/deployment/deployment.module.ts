import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { DeploymentController } from './deployment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deployment } from './deployment.entity';
import { DeploymentService } from './deployment.service';
import { RepositoryService } from 'src/repository/repository.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    BullModule.forRoot({
      redis: {
        host: 'redis_server',
        port: 6379,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_server',
      port: 3306,
      username: 'duong',
      password: '123456',
      database: 'gitea',
      entities: [Deployment],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Deployment]),
    BullModule.registerQueue({
      name: 'deployment',
    }),
  ],
  controllers: [DeploymentController],
  providers: [DeploymentService, RepositoryService],
})
export class DeploymentModule {}
