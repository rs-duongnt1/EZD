import { NestFactory } from '@nestjs/core';
import { ProjectModule } from './project.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

async function bootstrap() {
  console.log(process.env.MONGO_DSN);
  const app = await NestFactory.createMicroservice(ProjectModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: Number(process.env.PROJECT_SERVICE_PORT),
    },
  } as TcpOptions);

  await app.listen();
}
bootstrap();
