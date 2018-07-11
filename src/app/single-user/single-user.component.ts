import { Component, OnInit } from '@angular/core';
import {User} from '../models/User.model';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private   router: Router) { }

  ngOnInit() {
    // on créer d'abord un user vide temporaraire pour eviter les erreur au cas ou il ne soit pas arriver

    this.user = new User('', '', '');
    const id = this.route.snapshot.params['id'];
    this.usersService.getSignleUser(+id).then(
      (user: User) => {
        console.log(id);
        this.user = user;
      }
    );
    // this.usersService.getSignleUser(0);
  }
  onBack() {
    this.router.navigate(['/listUsers']);
  }
  onModification() {
    console.log('modification');
    this.router.navigate(['/user-form', 'update-user']);
  }

}
