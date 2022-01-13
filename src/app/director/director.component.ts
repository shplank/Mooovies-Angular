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
  directorId: any = localStorage.getItem('directorId') || '';
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favorites: any[] = this.user.Favorites;

  constructor(
    public router: Router,
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { this.router.routeReuseStrategy.shouldReuseRoute = () => false; }

    ngOnInit(): void {
      this.router.onSameUrlNavigation = 'reload';
      this.getDirector();
      this.getUser();
    }

    getDirector(): any {
      this.fetchApiData.getDirector(this.directorId).subscribe((response: any) => {
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
  
  }

