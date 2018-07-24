import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/User.model';
import { Router, ChildActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit {
// user = firebase.auth().currentUser;
user: firebase.User;
  constructor(private usersService: UsersService,
              private router: Router,
              private AfAuth: AngularFireAuth) {
                 AfAuth.authState.subscribe(user => this.user = user);
                }

  ngOnInit() {
    console.log(this.user);
  }
  onUpdateProfile() {
    console.log(this.user.displayName);
  }

}
