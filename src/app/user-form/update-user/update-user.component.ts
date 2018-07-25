import { Component, OnInit } from '@angular/core';

import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})

export class UpdateUserComponent implements OnInit {

  usersSubscription: Subscription;

  constructor() {
   }

  ngOnInit() {}
}
