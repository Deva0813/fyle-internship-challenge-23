import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}`,{
        headers: {
          Authorization: 'Bearer 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',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params

  getReops(githubUsername: string, page: number, limit: number) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${limit}`,
      {
        headers: {
          Authorization: 'Bearer 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',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );
  }

  getRepoLangFromUrl(url: string) {
    return this.httpClient.get(url,{
      headers: {
        Authorization: 'Bearer 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',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }
}
