import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

const reposBaseUrl = 'https://git.rsdn.site/api/v1/repos';

@Injectable()
export class RepositoryService {
  constructor(private httpService: HttpService) {}
  getListRepos(accessToken: string) {
    return firstValueFrom(
      this.httpService.get(reposBaseUrl, {
        params: {
          access_token: accessToken,
        },
      }),
    );
  }
}
