import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
@Injectable()
export class ChildProcessService {
  exec(cwd: string, command: string): Promise<string> {
    return new Promise((resolve) => {
      exec(command, { cwd }, (err, stdout, stderr) => {
        if (err) throw err;
        if (stderr) throw stderr;
        resolve(stdout.trim());
      });
    });
  }
}
