import { ChildProcessService } from './../child_process/child_process.service';
import { Controller, Get } from '@nestjs/common';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { compile } from 'handlebars';
import { join } from 'path';
import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import * as chmodr from 'chmodr';

/**
 * https://devhints.io/git-log-format
 */

@Controller('repository')
export class RepositoryController {
  constructor(private childProcessService: ChildProcessService) {}
  @Get('create')
  async createRepo() {
    const templatePath = join(
      __dirname,
      '../../templates/post-receive.template',
    );

    const sourceDir = join(__dirname, '../../sources/xxxxxx.git');

    mkdirSync(sourceDir, {
      recursive: true,
    });

    const options: Partial<SimpleGitOptions> = {
      baseDir: sourceDir,
      binary: 'git',
      maxConcurrentProcesses: 6,
      trimmed: false,
    };
    const git: SimpleGit = simpleGit(options);

    await git.init(true);

    // const content = readFileSync();
    const content = readFileSync(templatePath, 'utf-8');

    const template = compile(content);

    const contents = template({
      DEPLOY_DIR: '/home/gmoduong/Desktop/git-bare/source-deploying',
      BARE_DIR: sourceDir,
      SCRIPT_PATH: '/home/gmoduong/Desktop/myproject/git-bare/scripts/pre-push',
    });

    writeFileSync(join(sourceDir, 'hooks', 'post-receive'), contents);

    chmodr(join(sourceDir, 'hooks', 'post-receive'), 0o755, (err) => {});

    return contents;
  }
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
