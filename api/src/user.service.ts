import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

const usersBaseUrl = 'https://git.rsdn.site/api/v1/users';
const userBaseUrl = 'https://git.rsdn.site/api/v1/user';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}
  getUserByToken(token: string) {
    return firstValueFrom(
      this.httpService.get(userBaseUrl, {
        headers: {
          authorization: 'Basic ' + token,
        },
      }),
    );
  }

  getUserByAccessToken(accessToken: string) {
    return firstValueFrom(
      this.httpService.get(`${userBaseUrl}`, {
        params: {
          access_token: accessToken,
        },
      }),
    );
  }

  getListRepo(accessToken: string) {
    return firstValueFrom(
      this.httpService.get(`${userBaseUrl}/repos`, {
        params: {
          access_token: accessToken,
        },
      }),
    );
  }

  createAccessToken(token: string, username: string, name: string) {
    const url = `${usersBaseUrl}/${username}/tokens`;
    return firstValueFrom(
      this.httpService.post(
        url,
        { name },
        {
          headers: {
            authorization: 'Basic ' + token,
          },
        },
      ),
    );
  }
}
