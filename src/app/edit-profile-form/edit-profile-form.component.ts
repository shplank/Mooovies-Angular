import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

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
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  updateProfile(): void {
    this.fetchApiData.updateProfile(this.user.Username, this.userData).subscribe((response) => {
    
     this.dialogRef.close();
     console.log(response);
     this.snackBar.open('Profile updated.', 'Thanks!', {
      duration: 4000
      });
    }, (response) => {
      this.snackBar.open("Something's not right.", 'Try again!', {
        duration: 4000
      });
    });
  }

}
