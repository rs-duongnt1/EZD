import { HttpStatus } from '@nestjs/common';
import { IProject } from './project.interface';
export interface IProjectListResponse {
  status: HttpStatus;
  data: {
    projects: IProject[];
    total: number;
  };
  message: string;
  errors?: { [key: string]: any } | null;
}
