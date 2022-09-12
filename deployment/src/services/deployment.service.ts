import { IDeploymentCreateParams } from './../interfaces/deployment-create-params.interface';
import { IDeployment } from './../interfaces/deployment.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class DeploymentService {
  constructor(
    @InjectModel('Deployment')
    private readonly deploymentModel: Model<IDeployment>,
  ) {}

  search(params) {
    return this.deploymentModel
      .find({
        projectId: params.projectId,
      })
      .sort({ updatedAt: -1 });
  }

  findById(id: string) {
    return this.deploymentModel.findById(id);
  }

  create(params: IDeploymentCreateParams) {
    const deployment = new this.deploymentModel({
      projectId: params.projectId,
      state: 'QUEUED',
    });

    return deployment.save();
  }

  updateById(id: string, dataUpdate: IDeployment) {
    return this.deploymentModel.updateOne(
      {
        _id: id,
      },
      dataUpdate,
    );
  }
}
