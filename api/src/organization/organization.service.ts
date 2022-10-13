import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

const orgsBaseUrl = 'http://localhost:4444/api/v1/orgs';

@Injectable()
export class OrganizationService {
  constructor(private httpService: HttpService) {}
  getListOrgs(access_token: string) {
    return firstValueFrom(
      this.httpService.get(orgsBaseUrl, {
        params: {
          access_token,
        },
      }),
    );
  }

  getListRepo(access_token: string, org: string) {
    return firstValueFrom(
      this.httpService.get(`${orgsBaseUrl}/${org}/repos`, {
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
        `${orgsBaseUrl}`,
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
