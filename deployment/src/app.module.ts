import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeploymentProcessor } from './processors/deployment.processor';
import { Deployment } from './entities/deployment.entity';
import { DeploymentService } from './services/deployment.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis_server',
        port: 6379,
        // password: 'YkKtXeWpxYsktbA7hFCQ8ll9yTLGx82c',
      },
    }),
    TypeOrmModule.forFeature([Deployment]),
    BullModule.registerQueue({
      name: 'deployment',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_server',
      port: 3306,
      username: 'duong',
      password: '123456',
      database: 'gitea',
      entities: [Deployment],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DeploymentProcessor, DeploymentService],
})
export class AppModule {}
