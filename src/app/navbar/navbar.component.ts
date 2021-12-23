import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');
  genres: any;
  directors: any;

  constructor(
    public router: Router,
    public fetchApiData: FetchApiDataService,
    public menu: MatMenuModule,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.getAllGenres();
    this.getAllDirectors();
  }

  getAllGenres(): void {
    this.fetchApiData.getAllGenres().subscribe((response: any) => {
      this.genres = response;
        console.log(this.genres);
        return this.genres;
    });
  }
  
  getAllDirectors(): void {
    this.fetchApiData.getAllDirectors().subscribe((response: any) => {
      this.directors = response;
        console.log(this.directors); 
        return this.directors;
    });
  }

  toFilms(): void {
    this.router.navigate(['films']);
  }

  toGenre(_id: any): void {
    this.router.navigate(['Genre']);
  }

  toDirector(_id: any): void {
    this.router.navigate(['Director']);
  }

  toProfile(): void {
    this.router.navigate(['users']);
  }

  openEdit(): void {
    this.dialog.open(EditProfileFormComponent, {
      width: '500px'
    });
  }

  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/welcome'])
      .catch(console.error);
  }

}
