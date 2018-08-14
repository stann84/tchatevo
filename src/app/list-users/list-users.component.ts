import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

 public users: Observable<any[]>;

  constructor(
               private router: Router,
               private afs: AngularFirestore) {
                  this.users = afs.collection('users').valueChanges();
                }
              }



