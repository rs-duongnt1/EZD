import { IDeploymentListResponse } from './interfaces/deployment-list-response.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ITeam } from './interfaces/team.interface';
import { IProject } from './interfaces/project.interface';
import { IDeploymentCreateResponse } from './interfaces/deployment-create-response.interface';
import { IDeploymentCreateParams } from './interfaces/deployment-create-params.interface';
import { DeploymentService } from './services/deployment.service';
import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import * as mongoose from 'mongoose';
import { IDeployment } from './interfaces/deployment.interface';
import { IDeploymentProcessorAddedResponse } from './interfaces/deployment-processor-added-response.interface';
@Controller()
export class DeploymentController {
  constructor(
    private deploymentService: DeploymentService,
    @InjectQueue('deployment') private deploymentQueue: Queue,
  ) {}

  @MessagePattern('deployment_search')
  public async deploymentSearch(params): Promise<IDeploymentListResponse> {
    console.log('searching...');
    const deployments = await this.deploymentService.search(params);

    return {
      status: HttpStatus.OK,
      data: {
        deployments: deployments,
      },
      message: 'deployment_search_success',
      errors: null,
    };
  }

  @MessagePattern('deployment_get_by_id')
  public async deploymentSearchById(
    id: string,
  ): Promise<IDeploymentCreateResponse> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'deployment_id_invalid',
        data: {
          deployment: null,
        },
        errors: null,
      };
    }

    const deployment = await this.deploymentService.findById(id);
    if (!deployment) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'deployment_not_found',
        data: {
          deployment: null,
        },
        errors: null,
      };
    }
    return {
      status: HttpStatus.OK,
      message: 'deployment_get_success',
      data: {
        deployment: deployment,
      },
      errors: null,
    };
  }

  @MessagePattern('deployment_create')
  public async deploymentInit(
    params: IDeploymentCreateParams,
  ): Promise<IDeploymentCreateResponse> {
    const deployment = await this.deploymentService.create(params);
    return {
      status: HttpStatus.CREATED,
      errors: null,
      message: 'deployment_create_success',
      data: {
        deployment,
      },
    };
  }

  @MessagePattern('deployment_processor_added')
  public async deploymentProcessorAdded({
    project,
    team,
    deployment,
  }: {
    project: IProject;
    team: ITeam;
    deployment: IDeployment;
  }): Promise<IDeploymentProcessorAddedResponse> {
    Logger.log('deployment_processor_added_queue_success');
    this.deploymentQueue.add('building', { project, team, deployment });
    return {
      status: HttpStatus.CREATED,
      message: 'deployment_processor_added_queue_success',
    };
  }
}
