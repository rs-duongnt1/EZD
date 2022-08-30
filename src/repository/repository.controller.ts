import { ChildProcessService } from './../child_process/child_process.service';
import { Controller, Get } from '@nestjs/common';

/**
 * https://devhints.io/git-log-format
 */

@Controller('repository')
export class RepositoryController {
  constructor(private childProcessService: ChildProcessService) {}
  @Get('branch')
  async getBranch() {
    const cwd = '/home/gmoduong/Desktop/git-bare/bare-source';

    const result = await this.childProcessService.exec(
      cwd,
      'git log develop --format=%H',
    );

    const hashes = result.split('\n');

    const commits = [];

    for (const hash of hashes) {
      const commitMessage = await this.childProcessService.exec(
        cwd,
        `git log -n 1 --pretty=format:%B ${hash}`,
      );

      const authorName = await this.childProcessService.exec(
        cwd,
        `git log -n 1 --pretty=format:%an ${hash}`,
      );

      const authorEmail = await this.childProcessService.exec(
        cwd,
        `git log -n 1 --pretty=format:%ae ${hash}`,
      );

      const committerDate = await this.childProcessService.exec(
        cwd,
        `git log -n 1 --pretty=format:%ci ${hash}`,
      );

      const committerName = await this.childProcessService.exec(
        cwd,
        `git log -n 1 --pretty=format:%cn ${hash}`,
      );

      commits.push({
        hash: hash,
        message: commitMessage,
        author: {
          name: authorName,
          email: authorEmail,
        },
        committer: {
          date: committerDate,
          name: committerName,
        },
      });
    }

    return commits;
  }
}
