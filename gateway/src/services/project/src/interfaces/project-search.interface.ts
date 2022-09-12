import { IProject } from './project.interface';
export interface IProjectSearch {
  status: number;
  message: string;
  data: {
    projects: IProject[];
    total: number;
  };
}
