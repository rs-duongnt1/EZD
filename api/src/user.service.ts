import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  private usersBaseUrl = process.env.GITEA_API_URL + '/users';
  private userBaseUrl = process.env.GITEA_API_URL + '/user';
  constructor(private httpService: HttpService) {}
  getUserByToken(token: string) {
    return firstValueFrom(
      this.httpService.get(this.userBaseUrl, {
        headers: {
          authorization: 'Basic ' + token,
        },
      }),
    );
  }

  getUserByAccessToken(accessToken: string) {
    console.log(this.userBaseUrl);
    return firstValueFrom(
      this.httpService.get(`${this.userBaseUrl}`, {
        params: {
          access_token: accessToken,
        },
      }),
    );
  }

  getListRepo(accessToken: string) {
    return firstValueFrom(
      this.httpService.get(`${this.userBaseUrl}/repos`, {
        params: {
          access_token: accessToken,
          sort: 'newest',
        },
      }),
    );
  }

  createAccessToken(token: string, username: string, name: string) {
    const url = `${this.usersBaseUrl}/${username}/tokens`;
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
