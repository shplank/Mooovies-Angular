import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})

export class FilmDetailsComponent implements OnInit {
  film: any;
  user = JSON.parse(localStorage.getItem('user') || '');
  favorites: any[] = this.user.Favorites;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Title: string; },
    public router: Router,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<FilmDetailsComponent>,
  ) { }

  ngOnInit(): void {
    this.getFilm();
    this.getFavorites();
  }

  /**
  * makes api call for data about all films
  * @function getFilm
  * @param Title {string}
  * @returns film object in json format
  */
  getFilm(): void {
    this.fetchApiData.getFilm(this.data.Title).subscribe((response: any) => {
      this.film = response;
        console.log(this.film);
        return this.film;
    });
  }

  /**
  * routes to genre view on details dialogue click event
  * @function toGenre
  * @param genreId {any}
  */
  toGenre( _id: any ): void {
    localStorage.setItem('genreId', _id);
    console.log("GenreId:", _id);
    this.dialogRef.close();
    this.router.navigate(['Genre']);
  }

  /**
  * routes to director view on details dialogue click event
  * @function toDirector
  * @param directorId {any}
  */
  toDirector( _id: any ): void {
    localStorage.setItem('directorId', _id);
    console.log("directorId':", _id);
    this.dialogRef.close();
    this.router.navigate(['Director']);
  }

  /**
  * makes api call for data about current user's favorites
  * @function getFavorites
  * @returns array of film objects in json format
  */
  getFavorites(): void {
    this.fetchApiData.getUser(this.user.Username).subscribe((response: any) => {
      this.favorites = response.Favorites;
      return this.favorites;
    });
  }

  /**
  * triggers add/remove favorite functions on fave icon click event
  * @function makeFave
  * @param film {any}
  */
  makeFave(film: any): void {
    this.faveFilm(film._id)
      ? this.removeFavorite(this.user.Username, film._id)
      : this.addFavorite(this.user.Username, film._id);
  }

  /**
  * determines favorite status of film and whether to add/remove as favorite
  * @function faveFilm
  * @param FilmId {string}
  */
  faveFilm(FilmId: string): boolean {
    return this.favorites.some((film) => film._id === FilmId);
  }

  /**
  * makes api call to add a film to a user's favorites
  * @function addFavorite
  * @param Username {any}
  * @param FilmId {string}
  * @returns array of film objects in json format
  */
  addFavorite(Username: any, FilmId: string): void {
    this.fetchApiData.addFavorite(this.user.Username, this.film._id).subscribe((response: any) => {
      this.snackBar.open(`${this.film.Title} added to favorites.`, 'Neat!', {
        duration: 4000
        });
      this.favorites = response.Favorites;
      return this.favorites;
    });
    return this.getFavorites();
  }

  /**
  * makes api call to remove a film from a user's favorites
  * @function removeFavorite
  * @param Username {any}
  * @param FilmId {string}
  * @returns array of film objects in json format
  */
  removeFavorite(Username: any, FilmId: string): void {
    this.fetchApiData.removeFavorite(this.user.Username, this.film._id).subscribe((response: any) => {
      this.snackBar.open(`${this.film.Title} removed from favorites.`, `Bye ${this.film.Title}.`, {
        duration: 4000
        });
      this.favorites = response.Favorites;
      return this.favorites;
    });
    return this.getFavorites();
  }

}
