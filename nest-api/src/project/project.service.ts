import { DeploymentStatus } from './../core/enums/deployment-status';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Project, ProjectDocument } from './project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dtos/create-project';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  create(createProject: CreateProjectDto) {
    const project = new this.projectModel({
      name: createProject.name,
      org: createProject.org,
      framework: createProject.framework,
      status: DeploymentStatus.QUEUED,
    });
    return project.save();
  }

  findAll() {
    return this.projectModel.find();
  }

  findByName(name: string) {
    return this.projectModel.findOne({ name });
  }

  findById(id: string) {
    return this.projectModel.findById(id);
  }

  deleteAll() {
    return this.projectModel.deleteMany({});
  }
  updateById(id: string, dataUpdate: any) {
    return this.projectModel.updateOne(
      {
        _id: id,
      },
      {
        $set: dataUpdate,
      },
    );
  }
}
