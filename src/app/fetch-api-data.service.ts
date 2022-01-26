import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moooviesapi.herokuapp.com/';

const token = localStorage.getItem('token');

const headers = {headers: new HttpHeaders({ Authorization: 'Bearer ' + token })};

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  static getUser(Username: any) {
    throw new Error('Method not implemented.');
  }

  /* Inject the HttpClient module to the constructor params.
    This will provide HttpClient to the entire class, making it available via this.http */
  constructor(private http: HttpClient) {
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
  
  // Error handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  /**
  * api call for the user registration endpoint
  * @function userRegistration
  * @param userDetails {any}
  * @returns a user object in json format
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'register', userDetails)
    .pipe(catchError(this.handleError));
  }

  /**
  * api call for user login
  * @function userLogin
  * @param userDetails {any}
  */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    const { Username, Password } = userDetails;
    return this.http.post(apiUrl + 'login?Username=' + Username + '&Password=' + Password, headers)
      .pipe(catchError(this.handleError));
  }
 
  /**
  * api call for list of data about all films
  * @function getAllFilms
  * @returns array of film objects in json format
  */
  public getAllFilms(): Observable<any> {
    return this.http.get(apiUrl + 'films', headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
  * api call for data about a single film
  * @function getFilm
  * @param Title {string}
  * @returns a film object in json format
  */
  public getFilm(Title: string): Observable<any> {
    return this.http.get(apiUrl + 'films/' + Title, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
  * api call for list of data about all directors
  * @function getAllDirectors
  * @returns array of director objects in json format
  */
  public getAllDirectors(): Observable<any> {
    return this.http.get(apiUrl + 'directors', headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
  * api call for list of data about all genres
  * @function getAllGenres
  * @returns array of genre objects in json format
  */
  public getAllGenres(): Observable<any> {
    return this.http.get(apiUrl + 'genres', headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
  * api call for data about a single director
  * @function getDirector
  * @param DirectorId {string}
  * @returns a director object in json format
  */
  public getDirector(DirectorId: string): Observable<any> {
    return this.http.get(apiUrl + 'Director/' + DirectorId, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  /**
  * api call for data about a single genre
  * @function getGenre
  * @param genreId {string}
  * @returns a genre object in json format
  */
  public getGenre(genreId: any): Observable<any> {
    return this.http.get(apiUrl + 'Genre/' + genreId, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  /**
  * api call for data about a single user
  * @function getUser
  * @param Username {any}
  * @returns a user object in json format
  */
  public getUser(Username: any): Observable<any> {
    return this.http.get(apiUrl + 'users/' + Username, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  /**
  * api call for getting user favorites
  * @function getFavorites
  * @param Username {any}
  * @returns an array of film objects in json format
  */
  public getFavorites(Username: any): Observable<any> {
    return this.http.get(apiUrl + 'favorites/' + Username, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  /**
  * api call for adding a film to a user's favorites
  * @function addFavorite
  * @param Username {any}
  * @param FilmId {string}
  * @returns an array of film objects in json format
  */
  public addFavorite(Username: any, FilmId: string): Observable<any> {
    return this.http.post(apiUrl + 'favorites/' + Username + '/films/' + FilmId, null, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  /**
  * api call for removing a film from a user's favorites
  * @function removeFavorite
  * @param Username {any}
  * @param FilmId {string}
  * @returns an array of film objects in json format
  */
  public removeFavorite(Username: any, FilmId: string): Observable<any> {
    return this.http.delete(apiUrl + 'favorites/' + Username + '/films/' + FilmId, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  /**
  * api call for user profile update
  * @function updateProfile
  * @param Username {any}
  * @param updatedInfo {object}
  * @returns an updated a user object in json format
  */
  public updateProfile(Username: any, updatedInfo: object): Observable<any> {
    return this.http.put(apiUrl + 'users/update/' + Username, updatedInfo, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  /**
  * api call for user profile deletion
  * @function deleteProfile
  * @param Username {any}
  */
  public deleteProfile(Username: any): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + Username, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

}
