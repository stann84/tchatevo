import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/User.model';
import { Router, ChildActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit {
  users: User[
  ];
  usersSubscription: Subscription;

 /* const rootRef = firebase.database().ref();
  const oneRef = rootRef.child('users');
  const db = firebase.database();
  const users = db.ref()child("users");*/

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(id = 0) { this.router.navigate(['/users', 'view', id]);
    this.usersSubscription = this.usersService.usersSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.usersService.emitUsers();
    this.usersService.getUsers();
  }

  onViewUser(id: number) {
   this.router.navigate(['/users', 'view', id]);
  }
}/*

  ngOnInit() {
    this.usersSubscription = this.usersService.usersSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.usersService.emitUsers();
    this.usersService.getUsers();
  }

  onViewUser(id: number) {
   this.router.navigate(['/users', 'view', id]);
  }
}*/
