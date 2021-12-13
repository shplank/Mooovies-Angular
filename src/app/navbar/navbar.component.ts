import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { FetchApiDataService } from '../fetch-api-data.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
//    public fetchApiData = FetchApiDataService,
    public menu: MatMenuModule,
    ) { }

  user: any = {}

  ngOnInit(): void {
//    this.getUserData();
  }

//  getUserData(): void {
//    const currentUser = localStorage.getItem('user');
//    this.fetchApiData.getUser(currentUser).subscribe((response: any) => {
//      this.user = response;
//   })
//  }

  toFilms(): void {
    this.router.navigate(['films']);
  }

  toGenre(): void {
    this.router.navigate(['genres']);
  }

  toDirector(): void {
    this.router.navigate(['directors']);
  }

  toProfile(): void {
    this.router.navigate(['users']);
  }

}
