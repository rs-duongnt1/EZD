import { TeamModule } from './team.module';
import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TeamModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: Number(process.env.TEAM_SERVICE_PORT),
    },
  } as TcpOptions);

  await app.listen();
}
bootstrap();
