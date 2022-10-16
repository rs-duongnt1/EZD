import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { DeploymentController } from './deployment.controller';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis_server',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'deployment',
    }),
  ],
  controllers: [DeploymentController],
  providers: [],
})
export class DeploymentModule {}
