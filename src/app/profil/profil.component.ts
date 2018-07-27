import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})


export class ProfilComponent {
 user = this.auth.user;

  constructor(public auth: AuthService,
              private router: Router) {}

  onUpdateProfile() {
    console.log('onUpdateProfile');
  }

}
