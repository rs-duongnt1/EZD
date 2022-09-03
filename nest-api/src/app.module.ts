import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChildProcessModule } from './child_process/child_process.module';
import { RepositoryModule } from './repository/repository.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ProjectModule } from './project/project.module';
import { ConfigModule } from '@nestjs/config';
import { DeploymentModule } from './deployment/deployment.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/my-collection'),
    ChildProcessModule,
    RepositoryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot(),
    ProjectModule,
    DeploymentModule,
    BullModule.forRoot({
      redis: {
        host: 'redis-15712.c12.us-east-1-4.ec2.cloud.redislabs.com',
        port: 15712,
        password: 'YkKtXeWpxYsktbA7hFCQ8ll9yTLGx82c',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
