import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

const orgsBaseUrl = 'https://git.rsdn.site/api/v1/orgs';

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
}
