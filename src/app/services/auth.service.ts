import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  // statut?: string;
  pseudo?: string;
  ville?: string;
  age: string;

}
@Injectable()
export class AuthService {
    user: Observable<User>;
    router: Router;
    errorMessage: any;
    currentUser: User;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private db: AngularFireDatabase) {



    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`)
            .valueChanges();
        } else {
          return Observable.of(null);
        }
      }); /*
  .subscribe (user => {
    this.user[user.pseudo] = user.pseudo;
  }); */
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

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((credential) => {
          console.log(credential);
      });
  }

  public updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> =
      this.afs.doc(`users/${user.uid}`);

      console.log(`users/${user.email}${user.pseudo}`);

    console.log(' displayN = ' + user.displayName);
    console.log(' pseudo = ' + user.pseudo);

    // user.pseudo = 'toto';
    // user.pseudo = this.afs.doc(`users/${user.uid}`);

    // const pseudoRef = user.pseudo;
    // console.log(`users/${user.pseudo}`);
    // console.log(this.user);
    // console.log('updateUserData user.pseudo =' + user.pseudo);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      pseudo: user.pseudo,
      ville: user.ville,
      age: user.age
    };
    return userRef.set(data);
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
    firebase.auth().signOut();
  }
}
