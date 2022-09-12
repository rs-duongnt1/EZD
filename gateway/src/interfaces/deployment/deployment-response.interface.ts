import { HttpStatus } from '@nestjs/common';
import { IDeployment } from './deployment.interface';
export interface IDeploymentResponse {
  data: {
    deployment: IDeployment;
  };
  message: string;
  status: HttpStatus;
}
