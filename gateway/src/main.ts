import { Transport, TcpOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DeploymentModule } from './services/deployment/src/deployment.module';
import { TeamModule } from './services/team/src/team.module';
import { ProjectModule } from './services/project/src/project.module';

async function bootstrap() {
  bootstrapGateway();
  bootstrapDeploymentService();
  bootstrapTeamService();
  bootstrapProjectService();
}
bootstrap();

async function bootstrapGateway() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .setVersion('1.0')
    .build();
  const PORT = process.env.API_GATEWAY_PORT || 3000;
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT, () => {
    Logger.log(`Server is listening sssss port ${PORT}`, 'Server');
  });
}

async function bootstrapDeploymentService() {
  const app = await NestFactory.createMicroservice(DeploymentModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: Number(process.env.DEPLOYMENT_SERVICE_PORT),
    },
  } as TcpOptions);

  app.enableShutdownHooks();

  await app.listen();
  Logger.log('Microservice start successfully!', 'DeploymentService');
}

async function bootstrapTeamService() {
  const app = await NestFactory.createMicroservice(TeamModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: Number(process.env.TEAM_SERVICE_PORT),
    },
  } as TcpOptions);

  await app.listen();
  Logger.log('Microservice start successfully!', 'TeamService');
}

async function bootstrapProjectService() {
  const app = await NestFactory.createMicroservice(ProjectModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: Number(process.env.PROJECT_SERVICE_PORT),
    },
  } as TcpOptions);

  await app.listen();
  Logger.log('Microservice start successfully!', 'ProjectService');
}
