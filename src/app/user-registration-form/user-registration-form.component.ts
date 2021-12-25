import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthdate: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
    // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success
     console.log(response);
     this.snackBar.open('Profile created.', 'Please log in!', {
      duration: 4000
      });
    }, (response) => {
      this.snackBar.open('Incorrect username or password.', 'Try again!', {
        duration: 4000
      });
    });
  }

}
