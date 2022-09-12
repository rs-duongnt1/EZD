import { IProject } from './project.interface';
import { HttpStatus } from '@nestjs/common';
export interface IProjectDetailResponse {
  status: HttpStatus;
  data: {
    project: IProject;
  };
  message: string;
  errors: { [key: string]: any } | null;
}
