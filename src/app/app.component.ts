import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  username: string = 'johnpapa';
  page_no: number = 1;
  limit: number = 10;
  total_repos: number = 0;
  total_pages: number = 0;

  userDetails: any;
  userRepos: any = [];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.apiService.getUser(this.username).subscribe((user: any) => {
      this.userDetails = user;
      this.total_repos = user.public_repos;
      this.total_pages = Math.ceil(this.total_repos / this.limit);
    });

    this.apiService.getReops(this.username, 1, 10).subscribe((repos) => {
      this.userRepos = repos;
      this.getRepoLang();
    });
  }

  getUserAndRepo() {
    this.apiService.getUser(this.username).subscribe((user: any) => {
      this.userDetails = user;
      this.total_repos = user.public_repos;
      this.total_pages = Math.ceil(this.total_repos / this.limit);
    });

    this.apiService.getReops(this.username, 1, 10).subscribe((repos) => {
      this.userRepos = repos;
      this.getRepoLang();
    });
  }

  getRepos() {
    this.apiService
      .getReops(this.username, this.page_no, this.limit)
      .subscribe((repos: any) => {
        this.userRepos = repos;
        this.cdr.detectChanges();
        this.getRepoLang();
      });
  }

  getRepoLang() {
    this.userRepos.forEach((repo: any) => {
      this.apiService
        .getRepoLangFromUrl(repo.languages_url)
        .subscribe((lang) => (repo.languages = Object.keys(lang)));
    });
  }

  onLimitChange() {
    this.total_pages = Math.ceil(this.total_repos / this.limit);
    if (this.page_no > this.total_pages) {
      this.page_no = this.total_pages;
    }
    this.getRepos();
  }

  nextPage() {
    if (this.page_no * this.limit < this.total_repos) {
      this.page_no++;
      this.getRepos();
    }
  }

  prevPage() {
    if (this.page_no > 1) {
      this.page_no--;
      this.getRepos();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.total_pages }, (_, index) => index + 1);
  }

  goToPage(pageNumber: number) {
    if (
      pageNumber >= 1 &&
      pageNumber <= this.total_pages &&
      pageNumber !== this.page_no
    ) {
      this.page_no = pageNumber;
      this.getRepos();
    }
  }
}
