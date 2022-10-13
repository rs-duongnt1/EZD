import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrganizationService {
  private orgsBaseUrl = process.env.GITEA_API_URL + '/orgs';
  constructor(private httpService: HttpService) {}
  getListOrgs(access_token: string) {
    return firstValueFrom(
      this.httpService.get(this.orgsBaseUrl, {
        params: {
          access_token,
        },
      }),
    );
  }

  getListRepo(access_token: string, org: string) {
    return firstValueFrom(
      this.httpService.get(`${this.orgsBaseUrl}/${org}/repos`, {
        params: {
          access_token,
        },
      }),
    );
  }

  createOrg(
    access_token: string,
    {
      name,
      visibility,
    }: { org: string; name: string; visibility: 'public' | 'private' },
  ) {
    return firstValueFrom(
      this.httpService.post(
        `${this.orgsBaseUrl}`,
        {
          username: name,
          visibility: visibility,
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
