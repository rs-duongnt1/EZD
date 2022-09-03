import { DeploymentProcessor } from './deployment.processor';
import { BullModule } from '@nestjs/bull';
import { ProjectModule } from './../project/project.module';
import { Module } from '@nestjs/common';
import { DeploymentController } from './deployment.controller';

@Module({
  imports: [
    ProjectModule,
    BullModule.registerQueue({
      name: 'deployment',
    }),
  ],
  controllers: [DeploymentController],
  providers: [DeploymentProcessor],
})
export class DeploymentModule {}
