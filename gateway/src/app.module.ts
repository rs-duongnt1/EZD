import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DEPLOYMENT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          options: {
            host: '0.0.0.0',
            port: 8181,
          },
          transport: Transport.TCP,
        });
      },
    },
  ],
})
export class AppModule {}
