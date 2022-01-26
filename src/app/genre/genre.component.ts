import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { FilmDetailsComponent } from '../film-details/film-details.component';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})

export class GenreComponent implements OnInit {
  films: any[] = [];
  film: any;
  genre: any;
  genreId: any = localStorage.getItem('genreId') || '';
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favorites: any[] = this.user.Favorites;
  genreInfo: any;

  constructor(
    public router: Router,
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { this.router.routeReuseStrategy.shouldReuseRoute = () => false; }

  ngOnInit(): void {
    this.router.onSameUrlNavigation = 'reload';
    this.getGenre();
    this.getUser();
  }

  /**
  * api call for data about a single genre
  * @function getGenre
  * @param genreId {string}
  * @returns a genre object in json format
  */
  getGenre(): any {
    this.fetchApiData.getGenre(this.genreId).subscribe((response: any) => {
        this.genre = response;
        console.log(this.genre);
        return this.genre;
      });
    }

  /**
  * makes api call for data about current user
  * @function getUser
  * @returns user object in json format including favorites
  */
  getUser(): any {
      this.fetchApiData.getUser(this.user.Username).subscribe((response: any) => {
        this.favorites = response.Favorites;
        return this.favorites;
      });
    }

  /**
  * opens film details dialogue on film card click event
  * @function openFilmDetails
  * @param Title {string}
  */
  openFilmDetails( Title: string ): void {
    this.dialog.open(FilmDetailsComponent, { 
      data: { Title },
    });
  }
  
}
