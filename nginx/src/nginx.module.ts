import { NginxController } from "./nginx.controller";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [NginxController],
})
export class NginxModule {}
