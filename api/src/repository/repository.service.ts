import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RepositoryService {
  private reposBaseUrl = process.env.GITEA_API_URL + '/repos';
  constructor(private httpService: HttpService) {}
  getRepo(access_token: string, { org, repo }: { org: string; repo: string }) {
    return firstValueFrom(
      this.httpService.get(`${this.reposBaseUrl}/${org}/${repo}`, {
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
      this.httpService.get(`${this.reposBaseUrl}/${org}/${repo}/commits`, {
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
      this.httpService.get(`${this.reposBaseUrl}/${org}/${repo}/contents`, {
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
        `${this.reposBaseUrl}/${org}/${repo}/contents/${filePath}`,
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
      this.httpService.get(`${this.reposBaseUrl}/${org}/${repo}/commits`, {
        params: {
          path: path,
          access_token,
        },
      }),
    );
  }

  migrateRepo(
    access_token: string,
    {
      org,
      repo,
      service,
      uid,
      clone_addr,
    }: {
      org: string;
      repo: string;
      service: 'git' | 'github' | 'gitea' | 'gitlab';
      uid: number;
      clone_addr: string;
    },
  ) {
    return firstValueFrom(
      this.httpService.post(
        `${this.reposBaseUrl}/migrate`,
        {
          clone_addr: clone_addr,
          repo_name: repo,
          repo_owner: org,
          service: service,
          uid: uid,
        },
        {
          params: {
            access_token,
          },
        },
      ),
    );
  }

  createHook(
    access_token: string,
    { org, repo, url }: { org: string; repo: string; url: string },
  ) {
    return firstValueFrom(
      this.httpService.post(
        `${this.reposBaseUrl}/${org}/${repo}/hooks`,
        {
          type: 'gitea',
          config: {
            content_type: 'json',
            url: url,
          },
          events: [
            'create',
            'delete',
            'fork',
            'push',
            'issues',
            'issue_assign',
            'issue_label',
            'issue_milestone',
            'issue_comment',
            'pull_request',
            'pull_request_assign',
            'pull_request_label',
            'pull_request_milestone',
            'pull_request_comment',
            'pull_request_review_approved',
            'pull_request_review_rejected',
            'pull_request_review_comment',
            'pull_request_sync',
            'repository',
            'release',
            'package',
          ],
          active: true,
        },
        {
          params: {
            access_token,
          },
        },
      ),
    );
  }
}
