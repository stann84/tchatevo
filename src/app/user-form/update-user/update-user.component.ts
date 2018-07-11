import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import {UsersService} from '../../services/users.service';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs/Subscription';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})

export class UpdateUserComponent implements OnInit {

  // id = 1;
  // userId = User ;
// essaie de trouver l'id
 // userId = firebase.database().ref('users/' + userId );
  usersSubscription: Subscription;

  // pseudo = 'arthur';
  // afficher l'user :

  constructor(private usersService: UsersService) {
   }

  ngOnInit() {
   // console.log(this.user);
    /*this.usersSubscription = this.usersService.usersSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.usersService.emitUsers();
    this.usersService.getUsers();
 */ }
}
