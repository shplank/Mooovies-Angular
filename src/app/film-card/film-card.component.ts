import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FetchApiDataService } from '../fetch-api-data.service';
import { FilmDetailsComponent } from '../film-details/film-details.component';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})

export class FilmCardComponent implements OnInit {
  isLoading = false;
  films: any[] = [];
  film: any;
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favorites: any[] = this.user.Favorites;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getFilms();
    this.getUser();
  }

  getFilms(): void {
    this.isLoading = true;
    this.fetchApiData.getAllFilms().subscribe((response: any) => {
        this.films = response;
        console.log(this.films);
        return this.films;
      });
    this.isLoading = false;
    }

  getUser(): any {
      this.fetchApiData.getUser(this.user.Username).subscribe((response: any) => {
        this.favorites = response.Favorites;
        console.log(response);
        return this.favorites;
      });
    }

  openFilmDetails( Title: string ): void {
    this.dialog.open(FilmDetailsComponent, { 
      data: { Title },
    });
  }

}
