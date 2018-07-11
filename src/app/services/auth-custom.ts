import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable  } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

export class User {
    uid: string;
    username = '';

    constructor(authCustom) {
        this.uid = authCustom.uid;
    }
}

@Injectable()
export class AuthCustomService {
    currentUser: User;

    constructor() {}
}
