import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})
export class EditProfileFormComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');

  @Input() userData = {
    Username: this.user.Username,
    Password: '',
    Email: this.user.Email,
    Birthdate: this.user.Birthdate,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { onSuccess: () => void },
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
  * sends form inputs in api call to update user profile
  * @function updateProfile
  * @param Username {any}
  * @param userData {object}
  * @returns an updated user object in json format
  */
  updateProfile(): void {
    this.fetchApiData.updateProfile(this.user.Username, this.userData).subscribe((response) => {
     this.dialogRef.close();
     console.log(response);
     localStorage.setItem('user', JSON.stringify(response));
     this.snackBar.open('Profile updated.', 'Thanks!', {
      duration: 4000
      });
    }, (response) => {
      this.snackBar.open("Something's not right.", 'Try again!', {
        duration: 4000
      });
    });
  }

  /**
  * makes api call to delete user profile and clear localStorage
  * @function deleteProfile
  */
  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your profile?')) {
      window.localStorage.clear();
      this.dialogRef.close();
      this.router.navigate(['welcome']).then(() => {window.location.reload()});
      this.snackBar.open('Profile deleted.', 'Goodbye!', { duration: 4000 });
      this.fetchApiData.deleteProfile(this.user.Username).subscribe(() => { });
    }
  }

}
