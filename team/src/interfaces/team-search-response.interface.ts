import { ITeam } from './team.interface';
export interface ITeamSearchResponse {
  status: number;
  message: string;
  data: {
    teams: ITeam[];
    total: number;
  };
}
