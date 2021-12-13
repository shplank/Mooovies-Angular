import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moooviesapi.herokuapp.com/';

const token = localStorage.getItem('token');

const headers = {headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })};

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
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

 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'register', userDetails)
    .pipe(catchError(this.handleError));
  }

  // api call for user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    const { Username, Password } = userDetails;
    return this.http.post(apiUrl + 'login?Username=' + Username + '&Password=' + Password, headers)
      .pipe(catchError(this.handleError));
  }

  // api call for film list
  public getAllFilms(): Observable<any> {
    return this.http.get(apiUrl + 'films', headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // api call for single film details
  public getFilm(Title: string): Observable<any> {
    return this.http.get(apiUrl + 'films/' + Title, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // api call for director info
  public getDirector(DirectorId: string): Observable<any> {
    return this.http.get(apiUrl + '/Director/' + DirectorId, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  // api call for genre info
  public getGenre(GenreId: string): Observable<any> {
    return this.http.get(apiUrl + '/Genre/' + GenreId, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  // api call for getting user data, including favorites
  public getUser(Username: string): Observable<any> {
    return this.http.get(apiUrl + `users/${Username}`, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  // api call for adding favorite
  public addFavorite(Username: string, FilmId: string): Observable<any> {
    return this.http.post(apiUrl + '/favorites/' + Username + '/films/' + FilmId, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  // api call for removing favorite
  public removeFavorite(Username: string, FilmId: string): Observable<any> {
    return this.http.delete(apiUrl + '/favorites/' + Username + '/films/' + FilmId, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  // api call for profile update
  public updateProfile(Username: string, updatedInfo: object): Observable<any> {
    return this.http.put(apiUrl + '/users/update/' + Username, updatedInfo, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

  // api call for profile deletion
  public deleteProfile(Username: string): Observable<any> {
    return this.http.delete(apiUrl + '/users/' + Username, headers)
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }

}
