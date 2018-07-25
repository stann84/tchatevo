import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})


export class ProfilComponent {
// user = this.AuthService.user;
 user = this.auth.user;

  constructor(public auth: AuthService,
              private router: Router) {
                // AfAuth.authState.subscribe(user => this.user = user);
                }

  onUpdateProfile() {
    console.log('onUpdateProfile');
  }

}
