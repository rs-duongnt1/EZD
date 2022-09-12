import { exec } from 'child_process';
import { NginxModule } from './nginx.module';
import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';

async function bootstrap() {
  console.log(process.env.NGINX_SERVICE_PORT);
  const app = await NestFactory.createMicroservice(NginxModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: Number(process.env.NGINX_SERVICE_PORT),
    },
  } as TcpOptions);

  await app.listen();

}
bootstrap();
