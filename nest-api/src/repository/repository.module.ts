import { Module } from '@nestjs/common';
import { ChildProcessModule } from '../child_process/child_process.module';
import { RepositoryController } from './repository.controller';

@Module({
  imports: [ChildProcessModule],
  controllers: [RepositoryController],
})
export class RepositoryModule {}
