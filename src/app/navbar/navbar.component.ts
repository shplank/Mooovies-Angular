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

  /**
  * makes api call for list of data about all genres
  * @function getAllGenres
  * @returns array of genre objects in json format
  */
  getAllGenres(): void {
    this.fetchApiData.getAllGenres().subscribe((response: any) => {
      this.genres = response;
        return this.genres;
    });
  }

  /**
  * makes api call for list of data about all directors
  * @function getAllDirectors
  * @returns array of director objects in json format
  */
  getAllDirectors(): void {
    this.fetchApiData.getAllDirectors().subscribe((response: any) => {
      this.directors = response; 
        return this.directors;
    });
  }

  // functions attached to nav buttons

  /**
  * routes to film card view
  * @function toFilms
  */
  toFilms(): void {
    this.router.navigate(['films']);
  }

  /**
  * routes to genre view on genres dropdown click event
  * @function toGenre
  * @param _id {any}
  */
  toGenre( _id: any ): void {
    localStorage.setItem('genreId', _id);
    console.log("GenreId:", _id);
    this.router.navigate(['Genre']);
    this.router.onSameUrlNavigation = 'reload';
  }

  /**
  * routes to director view on directors dropdown click event
  * @function toDirector
  * @param _id {any}
  */
  toDirector( _id: any ): void {
    localStorage.setItem('directorId', _id);
    console.log("directorId':", _id);
    this.router.navigate(['Director']);
    this.router.onSameUrlNavigation = 'reload';
  }

  // functions under the user dropdown

  /**
  * routes to user profile (favorites) view
  * @function toProfile
  */
  toProfile(): void {
    this.router.navigate(['users']);
  }

  /**
  * opens profile edit dialogue
  * @function openEdit
  */
  openEdit(): void {
    this.dialog.open(EditProfileFormComponent, {
      width: '260px'
    });
  }

  /**
  * clears user from localStorage and routes to welcome view
  * @function logOut
  */
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
