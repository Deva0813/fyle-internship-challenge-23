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
      `https://api.github.com/users/${githubUsername}`
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params

  getReops(githubUsername: string, page: number, limit: number) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${limit}`
    );
  }

  getRepoLangFromUrl(url:string){
    return this.httpClient.get(url);
  }
}
