import { ITeam } from './team.interface';
import { HttpStatus } from '@nestjs/common';
export interface ITeamResponse {
  status: HttpStatus;
  team: ITeam;
  message: string;
}
