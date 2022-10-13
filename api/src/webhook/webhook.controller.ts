import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { Body, Controller, Post } from '@nestjs/common';
const execAsync = promisify(exec);

@Controller('webhook')
export class WebhookController {
  @Post()
  async index(@Body() body) {
    console.log(body);
    const repository = body.repository;
    const clone_url = repository.clone_url.replace(
      'localhost:4444',
      'git_server:3000',
    );

    const buildPath = join('/var/www/builds', repository.full_name);

    await execAsync(`mkdir -p ${buildPath}`);

    await execAsync(`git clone ${clone_url} ${buildPath}`, {
      cwd: buildPath,
    });

    await execAsync('npm install', {
      cwd: buildPath,
    });

    await execAsync('npm run build', {
      cwd: buildPath,
    });

    return clone_url;
  }
}
