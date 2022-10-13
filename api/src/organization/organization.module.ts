import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  imports: [HttpModule],
  controllers: [
    
    OrganizationController,
  ],
  providers: [OrganizationService],
})
export class OrganizationModule {}
