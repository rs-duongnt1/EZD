import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import { Controller, Get, NotFoundException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { writeFileSync, mkdirSync } from 'fs';

@Controller()
export class StorageController {
  constructor() {}

  @MessagePattern('storage_init_repository')
  public async deploymentSearchById(projectName: string) {
    const repoPath = `/data/repositories/${projectName}.git`;
    mkdirSync(repoPath, {
      recursive: true,
    });

    const options: Partial<SimpleGitOptions> = {
      baseDir: repoPath,
      binary: 'git',
      maxConcurrentProcesses: 6,
      trimmed: false,
    };
    const git: SimpleGit = simpleGit(options);

    await git.init(true);

    return true;
  }
}
