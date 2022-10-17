import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deployment } from './deployment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeploymentService {
  constructor(
    @InjectRepository(Deployment)
    private usersRepository: Repository<Deployment>,
  ) {}

  async findAllDeployments({ projectId }) {
    return this.usersRepository.find({
      where: {
        projectId,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async createDeployment(dataInsert: Deployment): Promise<Deployment> {
    const deployment = await this.usersRepository.save(dataInsert);
    return deployment;
  }
}
