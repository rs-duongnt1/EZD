import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

const reposBaseUrl = 'https://git.rsdn.site/api/v1/repos';

@Injectable()
export class RepositoryService {
  constructor(private httpService: HttpService) {}
  getRepo(access_token: string, { org, repo }: { org: string; repo: string }) {
    return firstValueFrom(
      this.httpService.get(`${reposBaseUrl}/${org}/${repo}`, {
        params: {
          access_token,
        },
      }),
    );
  }

  getCommits(
    access_token: string,
    { org, repo }: { org: string; repo: string },
  ) {
    return firstValueFrom(
      this.httpService.get(`${reposBaseUrl}/${org}/${repo}/commits`, {
        params: {
          access_token,
        },
      }),
    );
  }

  getFileContents(
    access_token: string,
    { org, repo }: { org: string; repo: string; branch: string },
  ) {
    return firstValueFrom(
      this.httpService.get(`${reposBaseUrl}/${org}/${repo}/contents`, {
        params: {
          access_token,
        },
      }),
    );
  }

  getContentByFilePath(
    access_token: string,
    { org, repo, filePath }: { org: string; repo: string; filePath: string },
  ) {
    return firstValueFrom(
      this.httpService.get(
        `${reposBaseUrl}/${org}/${repo}/contents/${filePath}`,
        {
          params: {
            access_token,
          },
        },
      ),
    );
  }
}
