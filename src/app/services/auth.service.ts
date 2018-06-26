import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable  } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';



interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
 // statut: string;
}
@Injectable ()
export class AuthService {

  user: Observable<User>;
  constructor (private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
this.user = this.afAuth.authState
.switchMap(user => {
  if (user) {
    return this.afs.doc<User>('users/${user.uid}').valueChanges();
    } else {
      return Observable.of(null);
    }
});
  }
googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return this.oAuthLogin(provider);
}
private oAuthLogin(provider) {
  return this.afAuth.auth.signInWithPopup(provider)
  .then((credential) => {
    this.updateUserData(credential.user);
  });
}

private updateUserData(user) {
const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/${user.uid}');

const data: User = {
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  // statut: user.status,
};

return userRef.set(data);
}
signOutUser() {
  firebase.auth().signOut();
}
}



/*import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor() { }

  createNewUser (email: string, password: string ) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
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

}*/
