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

  getFilm(): void {
    this.fetchApiData.getFilm(this.data.Title).subscribe((response: any) => {
      this.film = response;
        console.log(this.film);
        return this.film;
    });
  }

  openGenre(): void {
    const genre = this.film.Genre._id;
    this.fetchApiData.getGenre(genre).subscribe((response) => {
    this.dialogRef.close();
    this.router.navigate(['genres']);
    }, (response) => {
      
    });
  }

  openDirector(): void {
    const director = this.film.Director._id;
    this.fetchApiData.getGenre(director).subscribe((response) => {
    this.dialogRef.close();
    this.router.navigate(['directors']);
    }, (response) => {
      
    });
  }

  getFavorites(): void {
    this.fetchApiData.getUser(this.user.Username).subscribe((response: any) => {
      this.favorites = response.Favorites;
      return this.favorites;
    });
  }

  faveFilm(FilmId: string): boolean {
    return this.favorites.some((film) => film._id === FilmId);
  }

  makeFave(film: any): void {
    this.faveFilm(film._id)
      ? this.removeFavorite(film._id, film.Title)
      : this.addFavorite(film._id, film.Title);
  }

  addFavorite(FilmId: string, Title: string): void {
    this.fetchApiData.addFavorite(this.user.Username, FilmId).subscribe((response: any) => {
      this.snackBar.open(`${Title} added to favorites.`, 'Neat!', {
        duration: 4000
        });
      this.favorites = response.Favorites;
      return this.favorites;
    });
  }

  removeFavorite(FilmId: string, Title: string): void {
    this.fetchApiData.removeFavorite(this.user.Username, FilmId).subscribe((response: any) => {
      this.snackBar.open(`${Title} removed from favorites.`, `Bye ${Title}.`, {
        duration: 4000
        });
      this.favorites = response.Favorites;
      return this.favorites;
    });
  }

}
