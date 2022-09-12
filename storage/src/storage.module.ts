import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';

@Module({
  imports: [],
  controllers: [StorageController],
  providers: [],
})
export class StorageModule {}
