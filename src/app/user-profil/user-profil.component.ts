import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent {


  constructor(public auth: AuthService,
              ) {
   }
OnUpdateUserData(form: NgForm) {
  console.log(form.value);
   // this.auth.updateUserData(user);

    }
OnCreateProfile() {
      this.auth.createProfile();
    }
}
