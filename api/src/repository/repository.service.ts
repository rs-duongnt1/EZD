import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

const reposBaseUrl = 'http://localhost:4444/api/v1/repos';

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
    query,
  ) {
    return firstValueFrom(
      this.httpService.get(`${reposBaseUrl}/${org}/${repo}/commits`, {
        params: {
          access_token,
          ...(query.path && { path: query.path }),
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

  getCommitByPath(
    access_token: string,
    { org, repo, path }: { org: string; repo: string; path: string },
  ) {
    return firstValueFrom(
      this.httpService.get(`${reposBaseUrl}/${org}/${repo}/commits`, {
        params: {
          path: path,
          access_token,
        },
      }),
    );
  }
}
