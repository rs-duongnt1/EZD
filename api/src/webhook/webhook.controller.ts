import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { Body, Controller, Logger, Post } from '@nestjs/common';
const execAsync = promisify(exec);

@Controller('webhook')
export class WebhookController {
  @Post()
  async index(@Body() body) {
    const repository = body.repository;
    const clone_url = repository.clone_url.replace(
      'localhost:4444',
      'git_server:3000',
    );

    const buildPath = join('/var/www/builds', repository.full_name);

    await execAsync(`mkdir -p ${buildPath}`);

    const output  = await execAsync(`git clone ${clone_url} ${buildPath}`, {
      cwd: buildPath,
    });

    Logger.log('git cloning...', 'git');
    console.log(output);

    const output2 = await execAsync('npm install', {
      cwd: buildPath,
    });

    Logger.log('installing dependencies...', 'node');
    console.log(output2);

    const output3 = await execAsync('npm run build', {
      cwd: buildPath,
    });

    Logger.log('Building...', 'node');
    console.log(output3);

    return clone_url;
  }
}
