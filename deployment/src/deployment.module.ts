import { DeploymentProcessor } from './processors/deployment.processor';
import { BullModule } from '@nestjs/bull';
import { MongoConfigService } from './services/config/mongo-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeploymentService } from './services/deployment.service';
import { Module } from '@nestjs/common';
import { DeploymentSChema } from './schemas/deployment.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'Deployment',
        schema: DeploymentSChema,
      },
    ]),
    BullModule.forRoot({
      redis: {
        host: 'redis_server',
        port: 6379,
        // password: 'YkKtXeWpxYsktbA7hFCQ8ll9yTLGx82c',
      },
    }),
    BullModule.registerQueue({
      name: 'deployment',
    }),
  ],
  controllers: [],
  providers: [DeploymentService, DeploymentProcessor],
})
export class DeploymentModule {}
