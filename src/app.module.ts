import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChildProcessModule } from './child_process/child_process.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [ChildProcessModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
