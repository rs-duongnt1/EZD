import { IProject } from './project.interface';
export interface IProjectFindById {
  status: number;
  message: string;
  data: {
    project: IProject;
  } | null;
  errors: any;
}
