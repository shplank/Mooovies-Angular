import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
  })

  export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }
      
  ngOnInit(): void {
  }

  /**
  * sends form inputs in api call to update current user
  * @function loginUser
  * @param userData {object}
  * @returns an updated user object in json format
  */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
  // Logic for a successful user login goes here
    this.dialogRef.close(); // This will close the modal
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.snackBar.open('You are logged in.', 'Welcome!', {
      duration: 4000
      });
    this.router.navigate(['films']).then(() => {window.location.reload();
    });
    }, (response) => {
      this.snackBar.open('Incorrect username or password.', 'Try again!', {
        duration: 4000
      });
    });
  }
}
