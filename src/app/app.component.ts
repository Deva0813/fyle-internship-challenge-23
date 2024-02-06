import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  username: string = '';
  page_no: number = 1;
  limit: number = 10;

  userDetails: any;
  userRepos: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUser('johnpapa').subscribe((user) => {
      this.userDetails = user;
    });

    this.apiService.getReops('johnpapa', 1, 10).subscribe((repos) => {
      this.userRepos = repos;
    });

  }

  getUserAndRepo() {
    this.apiService.getUser(this.username).subscribe((user) => {
      this.userDetails = user;
    });

    this.apiService.getReops(this.username, 1, 10).subscribe((repos) => {
      this.userRepos = repos;
    });
  }

}
