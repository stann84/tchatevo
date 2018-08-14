import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { NotifyService } from '../services/notify.service';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  statut?: string;
  pseudo?: string;
  ville?: string;
  age?: string;
  message?: string;

}
@Injectable()
export class AuthService {
    user: Observable<User>;
    router: Router;
    errorMessage: any;


  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private db: AngularFireDatabase,
              private route: Router,
              private notify: NotifyService) {

    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`)
            .valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }
  // login facebook et google
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider: any) {
    console.log('oAuthlogin');
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
       //    return this.updateUserData(credential.user);
      });
      // .catch(error => this.handleError(error));
  }

  public updateUserData(user) {
    console.log('updatUserData');
    const userRef: AngularFirestoreDocument<User> =
      this.afs.doc(`users/${user.uid}`);
        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          pseudo: user.pseudo,
          ville: user.ville,
          age: user.age,
    };
    return userRef.set(data, {merge: true });
  }

createProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
      console.log('création de profil');
      this.db.list(`user/${auth.uid}`).push(this.user)
        .then(() => {
          this.router.navigate(['listUsers']);
        },
          (error) => {
            this.errorMessage = error;
          }
        );
    }
    );
  }

  // créer un user par email

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword
          (email, password).then(
            () => {
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
      }
    );
  }

  // connexion user par email

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
// deconnexion
  signOutUser() {
    firebase.auth().signOut()
    .then(() => {
      this.route.navigate(['/user-profil']);
      console.log('signOutUser');
    });
  }

 // If error, console log and notify user
 private handleError(error: Error) {
  console.error(error);
  this.notify.update(error.message, 'error');
}

}

