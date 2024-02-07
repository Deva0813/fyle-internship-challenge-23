import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  total_repos: number = 0;
  total_pages: number = 0;
  title:string = "fyle-frontend-challenge"

  repo_loading_state: boolean = false;
  user_loading_state: boolean = false;
  no_user_found: boolean = false;

  userDetails: any = null;
  userRepos: any = [];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  async getUserAndRepo() {
    this.user_loading_state = true;

    this.apiService.getUser(this.username).subscribe(
      async (user: any) => {
        this.userDetails = await user;
        this.total_repos = await user.public_repos;
        this.total_pages = Math.ceil(this.total_repos / this.limit);
        // this.no_user_found =false;
      },
      async (error) => {
        if (error.status === 404) {
          this.no_user_found = true;
          setTimeout(()=>{
            this.no_user_found = false;
          },3000)
          this.user_loading_state = false;
        } else {
          console.log(error);
        }
      }
    );

    this.apiService.getReops(this.username, 1, 10).subscribe(
      async (repos) => {
        this.userRepos = await repos;
        await this.getRepoLang();
        this.user_loading_state = false;
      },
      async (error) => {
        console.log(error);
        this.user_loading_state = false;
      }
    );
  }

  getRepos() {
    this.repo_loading_state = true;
    this.apiService
      .getReops(this.username, this.page_no, this.limit)
      .subscribe(async (repos: any) => {
        this.userRepos = await repos;
        this.cdr.detectChanges();
        this.getRepoLang();
      });
  }

  async getRepoLang() {
    await this.userRepos.forEach((repo: any) => {
      this.apiService
        .getRepoLangFromUrl(repo.languages_url)
        .subscribe((lang) => (repo.languages = Object.keys(lang)));
    });

    this.repo_loading_state = false;
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

  handleclear() {
    this.username = '';
    this.page_no = 1;
    this.limit = 10;
    this.total_repos = 0;
    this.total_pages = 0;

    this.repo_loading_state = false;
    this.user_loading_state = false;

    this.userDetails = null;
    this.userRepos = [];
  }
}
