import { IProject } from './../interfaces/project.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<IProject>,
  ) {}

  public async findAll(searchFilter: any) {
    return this.projectModel
      .find({
        ...(searchFilter.name && {
          name: { $regex: '.*' + searchFilter.name + '.*' },
        }),
        ...(searchFilter.teamId && {
          teamId: searchFilter.teamId,
        }),
        ...(searchFilter.status && { status: searchFilter.status }),
      })
      .sort({ createdAt: -1 })
      .limit(10);
  }

  public async getTotalProjects(searchFilter: any) {
    return this.projectModel.count({
      ...(searchFilter.q && { name: { $regex: '.*' + searchFilter.q + '.*' } }),
      ...(searchFilter.status && { status: searchFilter.status }),
    });
  }

  public async createProject(project: IProject) {
    const newProject = new this.projectModel(project);
    return newProject.save();
  }

  public async findById(id: string) {
    return this.projectModel.findOne({
      _id: id,
    });
  }

  public async findByName(name: string) {
    return this.projectModel.findOne({ name });
  }

  public async findBySlugAndTeamId(slug: string, teamId: string) {
    return this.projectModel.findOne({ slug, teamId });
  }
}
