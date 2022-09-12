import { Logger } from '@nestjs/common';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { DeploymentModule } from './deployment.module';
async function bootstrap() {
    const app = await NestFactory.createMicroservice(DeploymentModule, {
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: Number(8888),
        },
    } as TcpOptions);

    app.enableShutdownHooks();

    await app.listen();
    Logger.log('Microservice start successfully!', 'DeploymentService');
}

bootstrap();