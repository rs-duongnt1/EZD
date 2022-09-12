import { IDeployment } from './deployment.interface';
export interface IDeploymentListResponse {
  status: number;
  message: string;
  data: {
    deployments: IDeployment[];
  };
  errors: { [key: string]: any } | null;
}
