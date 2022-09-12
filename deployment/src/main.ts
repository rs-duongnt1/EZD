import { NestFactory } from '@nestjs/core';
import { DeploymentModule } from './deployment.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(DeploymentModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: Number(process.env.DEPLOYMENT_SERVICE_PORT),
    },
  } as TcpOptions);

  await app.listen();
}
bootstrap();
