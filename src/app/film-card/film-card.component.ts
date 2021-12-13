import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})

export class FilmCardComponent implements OnInit {
  films: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

ngOnInit(): void {
  this.getFilms();
}

getFilms(): void {
  this.fetchApiData.getAllFilms().subscribe((response: any) => {
      this.films = response;
      console.log(this.films);
      return this.films;
    });
  }
}
