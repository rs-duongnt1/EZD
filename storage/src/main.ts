import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(StorageModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: Number(process.env.STORAGE_SERVICE_PORT),
    },
  } as TcpOptions);

  await app.listen();
}
bootstrap();
