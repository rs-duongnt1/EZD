import { Controller, Get, Inject, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('storages')
@Controller('storages')
export class StorageController {
  constructor(
    @Inject('DEPLOYMENT_SERVICE')
    private readonly deploymentServiceClient: ClientProxy,
    @Inject('STORAGE_SERVICE')
    private readonly storageServiceClient: ClientProxy,
  ) {}

  @Get()
  async storage() {
    const deleteTaskResponse = await this.storageServiceClient.send(
      'storage_init_repository',
      'my-project',
    );
    throw new NotFoundException('error');
    return deleteTaskResponse;
  }
}
