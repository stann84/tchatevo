import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

// custom user

/* export class User {

  uid: string;
  username = '';
} */

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
 // statut?: string;
  pseudo?: string;
  // username?: string;

}
@Injectable ()
export class AuthService { user: Observable<User> ;
                          router: Router;
                          errorMessage: any;
                          currentUser: User;

  constructor (private afAuth: AngularFireAuth,
              private af: AngularFirestore,
              private db: AngularFireDatabase,
              private formBuilder: FormBuilder) {

// essai depuis le tuto
               /*this.afAuth.authState
               .switchMap(auth => {
                if (auth) {
                  console.log('swithmap auth ');
                 // this.currentUser = new User();
                 // this.currentUser = new User(auth);
                  return this.db.object('/users/${auth.uid}');
                } else { return []; }
              });
              .subscribe(user => {
                this.currentUser['username'] = user.username;
              });*/

// Connexion google ok mais le subscribe ne fonctionne pas
             // db.list('user');
                this.user = this.afAuth.authState
                .switchMap(user => {
                  if (user) {
                    return this.af.doc<User>('users/${user.uid}')
                   // .update({pseudo : user.user});
                    .valueChanges();
                    } else {
                     // console.log(Error);
                      return Observable.of(null);
                    }
                });
                console.log('manque subscribe');
               /* .subscribe (user => {
                  this.currentUser['username'] = user.username;
                }*/
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
      this.updateUserData(credential.user);
    });
  }

public updateUserData(user) {
        const userRef: AngularFirestoreDocument<User> =
        this.af.doc('users/${user.uid}');
      // this.af.collection('users').doc('users/${user.uid}').set(Object.assign({}, user))
      // console.log(user.pseudo);

        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        //  pseudo: user.pseudo
};
// return userRef.update(data, { create: true });
// j'essai d'assigner l'objet
// return userRef.set(Object.assign(data));
//  return userRef.update(data);
 // return userRef.set(data, { merge: true});
 return userRef.set(data, { merge: true });

// console.log(Error);
}

createProfile() {
  this.afAuth.authState.take(1).subscribe(auth => {
    console.log('creer un profil');
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

// créer un user par email

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

// connexion user par email

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
// deconnexion
signOutUser() {
  firebase.auth().signOut();
}
}
