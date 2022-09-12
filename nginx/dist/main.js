"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nginx_module_1 = require("./nginx.module");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    console.log(process.env.NGINX_SERVICE_PORT);
    const app = await core_1.NestFactory.createMicroservice(nginx_module_1.NginxModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: Number(process.env.NGINX_SERVICE_PORT),
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map