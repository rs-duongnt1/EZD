import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CaddyService {
  private baseUrl = 'http://caddy_server:2019/config/';
  constructor(private readonly httpService: HttpService) {}
  addConfig(domain: string, root: string) {
    const uri = `apps/http/servers/srv0/routes/0`;
    const data = {
      handle: [
        {
          handler: 'subroute',
          routes: [
            {
              handle: [
                {
                  handler: 'vars',
                  root: root,
                },
                {
                  handler: 'file_server',
                  hide: ['./Caddyfile'],
                },
              ],
            },
          ],
        },
      ],
      match: [
        {
          host: [domain],
        },
      ],
      terminal: true,
    };
    return this.httpService
      .put(this.baseUrl + uri, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .toPromise();
  }
}
