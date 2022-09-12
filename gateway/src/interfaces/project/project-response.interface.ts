import { HttpStatus } from '@nestjs/common';
import { IProject } from './project.interface';
export interface IProjectResponse {
  status: HttpStatus;
  data: {
    project: IProject;
  };
  message: string;
  errors?: { [key: string]: any } | null;
}
