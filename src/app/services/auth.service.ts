import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable  } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  statut?: string;
  pseudo?: string;
}
@Injectable ()
export class AuthService {

  user: Observable<User>;
  errorMessage: any;
  constructor (private afAuth: AngularFireAuth,
              private af: AngularFirestore,
              private router: Router,
             // private db: AngularFireDatabase
            ) {
             // db.list('user');
                this.user = this.afAuth.authState
                .switchMap(user => {
                  if (user) {
                    return this.af.doc<User>('users/${user.uid}').valueChanges();
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

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
      this.updateUserData(credential.user);
    });
  }

public updateUserData(user) {
        const userRef: AngularFirestoreDocument<User> =
        this.af.doc('users/${user.uid}');
       // console.log(user.pseudo);

        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
         // statut: user.status,
         //  pseudo: user.pseudo
};
return userRef.set(data);
// return userRef.set(data, { merge: true});
}

createNewUser (email: string, password: string ) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword
        (email, password).then(
          () => {
            resolve ();
          },
        (error) => {
            reject(error);
        }
        );
      }
    );
  }

createProfile() {
  this.afAuth.authState.take(1).subscribe(auth => {
    console.log('profil');
 /* this.db.list('user/${auth.uid}').push(this.user)
    .then(() => {
        this.router.navigate(['listUsers']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
 */ }
);
}
/*
createProfile() {
  this.afAuth.authState.take(1).subscribe(auth => {
  this.db.list('user/${auth.uid}').push(this.user)
    .then(() => {
        this.router.navigate(['listUsers']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
);
}*/

signInUser(email: string , password: string) {
  return new Promise (
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

signOutUser() {
  firebase.auth().signOut();
}
}
