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
  genreId: any;
  genrePanelOpenState: boolean = false;
  directorPanelOpenState: boolean = false;

  constructor(
    public router: Router,
    public fetchApiData: FetchApiDataService,
    public menu: MatMenuModule,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.router.onSameUrlNavigation = 'reload';
    this.getAllGenres();
    this.getAllDirectors();
  }

  getAllGenres(): void {
    this.fetchApiData.getAllGenres().subscribe((response: any) => {
      this.genres = response;
        return this.genres;
    });
  }
  
  getAllDirectors(): void {
    this.fetchApiData.getAllDirectors().subscribe((response: any) => {
      this.directors = response; 
        return this.directors;
    });
  }

  // functions attached to nav buttons

  toFilms(): void {
    this.router.navigate(['films']);
  }

  toGenre( _id: any ): void {
    localStorage.setItem('genreId', _id);
    console.log("GenreId:", _id);
    this.router.navigate(['Genre']);
    this.router.onSameUrlNavigation = 'reload';
  }

  toDirector( _id: any ): void {
    localStorage.setItem('directorId', _id);
    console.log("directorId':", _id);
    this.router.navigate(['Director']);
    this.router.onSameUrlNavigation = 'reload';
  }

  // functions under the user dropdown

  toProfile(): void {
    this.router.navigate(['users']);
  }

  openEdit(): void {
    this.dialog.open(EditProfileFormComponent, {
      width: '260px'
    });
  }

  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome'])
      .catch(console.error);
  }

  closePanel() {
    this.genrePanelOpenState = false;
    this.directorPanelOpenState = false;
  }

}
