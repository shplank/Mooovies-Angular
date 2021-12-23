import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { FilmDetailsComponent } from '../film-details/film-details.component';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  films: any[] = [];
  film: any;
  director: any;
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favorites: any[] = this.user.Favorites;
  id: any;
  public href: any = "";

  constructor(
    public router: Router,
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
      this.href = this.router.url.split("/").pop();
      console.log(this.router.url);
      this.getDirector();
      this.getUser();
    }

    getDirector(): any {
      this.fetchApiData.getDirector(this.href).subscribe((response: any) => {
          this.director = response;
          console.log(this.director);
          return this.director;
        });
      }
  
    getUser(): any {
        this.fetchApiData.getUser(this.user.Username).subscribe((response: any) => {
          this.favorites = response.Favorites;
          return this.favorites;
        });
      }
  
    openFilmDetails( Title: string ): void {
      this.dialog.open(FilmDetailsComponent, { 
        data: { Title },
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
  
    addFavorite(FilmId: string, Title: string): any {
      this.fetchApiData.addFavorite(this.user.Username, FilmId).subscribe((response: any) => {
        this.snackBar.open(`${Title} added to favorites.`, 'Neat!', {
          duration: 4000
          });
        this.favorites = response.Favorites;
        return this.favorites;
      });
    }
  
    removeFavorite(FilmId: string, Title: string): any {
      this.fetchApiData.removeFavorite(this.user.Username, FilmId).subscribe((response: any) => {
        this.snackBar.open(`${Title} removed from favorites.`, `Bye ${Title}.`, {
          duration: 4000
          });
        this.favorites = response.Favorites;
        return this.favorites;
      });
    }
  
  }

