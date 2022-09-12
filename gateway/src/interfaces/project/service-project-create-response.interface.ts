import { IProject } from './project.interface';
export interface IServiceProjectCreateResponse {
  status: number;
  message: string;
  project: IProject;
  errors: { [key: string]: any } | null;
}
