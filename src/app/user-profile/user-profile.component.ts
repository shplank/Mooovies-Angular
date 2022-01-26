import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { FilmDetailsComponent } from '../film-details/film-details.component';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  films: any[] = [];
  film: any;
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favorites: any[] = this.user.Favorites;

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getFavorites();
  }

  /**
  * makes api call for data about current user
  * @function getUserInfo
  * @param Username {any}
  * @returns a user object in json format
  */
  getUserInfo(): void {
    this.fetchApiData.getUser(this.user.Username).subscribe((response: any) => {
        this.user = response;
      });
    }

  /**
  * makes api call for getting current user's favorites
  * @function getFavorites
  * @param Username {any}
  * @returns an array of film objects in json format
  */
  getFavorites(): void {
    this.fetchApiData.getUser(this.user.Username).subscribe((response: any) => {
      this.favorites = response.Favorites;
      console.log(this.favorites);
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
