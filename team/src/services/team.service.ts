import { ITeamSearchParams } from './../interfaces/team-search-params.interface';
import { ITeam } from './../interfaces/team.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TeamService {
  constructor(@InjectModel('Team') private readonly teamModel: Model<ITeam>) {}

  public async search(params: ITeamSearchParams) {
    return this.teamModel.find({
      ...(params.name && { name: { $regex: '.*' + params.name + '.*' } }),
    });
  }

  public async searchCount(params: ITeamSearchParams) {
    return this.teamModel.count({
      ...(params.name && { name: { $regex: '.*' + params.name + '.*' } }),
    });
  }

  public async createTeam(team: ITeam) {
    const newTeam = new this.teamModel(team);
    return newTeam.save();
  }

  public async findByName(name: string) {
    return this.teamModel.findOne({ name });
  }

  public async findBySlug(slug: string) {
    return this.teamModel.findOne({ slug });
  }

  public async findById(id: string) {
    return this.teamModel.findById(id);
  }
}
