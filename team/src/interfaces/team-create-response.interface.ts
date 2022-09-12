import { ITeam } from './team.interface';
export interface ITeamCreateResponse {
  status: number;
  message: string;
  data: {
    team: ITeam;
  } | null;
  errors: { [key: string]: any } | null;
}
