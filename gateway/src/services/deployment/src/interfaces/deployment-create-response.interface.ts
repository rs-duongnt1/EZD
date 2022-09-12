import { IDeployment } from './deployment.interface';
export interface IDeploymentCreateResponse {
  status: number;
  message: string;
  data: {
    deployment: IDeployment;
  };
  errors: { [key: string]: any } | null;
}
