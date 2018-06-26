import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models/User.model';
import {Subscription} from 'rxjs/Subscription';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';
// afficher la liste des livres supprimer chaque livre naviguer pour creer un livre
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit , OnDestroy {

  // On créer l'array local des users pense a importer users et subscription
  users: User[];
  usersSubscription: Subscription;

  // on injecte les services
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.usersSubscription = this.usersService.usersSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.usersService.emitUsers();
  //  this.usersService.getUsers();
  }

  // créer un nouveau livre
  onNewuser() {
    this.router.navigate(['/users', 'new']);
  }
  onDeleteUser(user: User) {
   // this.usersService.removeUser(user);
  }

  onViewUser(id: number) {
   this.router.navigate(['/users', 'view', id]);
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
