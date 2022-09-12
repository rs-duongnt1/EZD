import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  await app.listen(3000, () => {
    Logger.log(`Server is listening sssss port ${PORT}`, 'Server');
  });
}
bootstrap();
