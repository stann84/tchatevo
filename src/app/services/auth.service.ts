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
              private afs: AngularFirestore,
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
            // pseudo = 'toto';
                this.user = this.afAuth.authState
                .switchMap(user => {
                  if (user) {
                    console.log('switchmap display = ' + user.displayName);
                   // console.log('switchmap pseudo = ' + pseudo);
                   // this.currentUser = this.user;
                    return this.afs.doc<User>('users/${user.uid}')
                  //  return this.afs.doc<User>('users/${user.uid}/users/${user.pseudo}');
                   // .update({pseudo : user.user});
                    .valueChanges();
                    } else {
                     // console.log(Error);
                      return Observable.of(null);
                    }
                });
                /*
                .subscribe (user => {
                 this.currentUser['pseudo'] = user.pseudo;
                });*/
              }



// db.collection("users").doc()
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

 /*  const pseudoRef = this.db.pseudo('pseudo').doc('xx');
  const setWithMerge = pseudoRef.set({
    capital: true
  }, { merge: true }); */
// chercher le pseudo
      //  const pseudoRef: AngularFirestoreDocument<User> =
      //  this.afs.doc('users/${user.uid}/pseudo{user.pseudo}');
// chercher l'user
        const userRef: AngularFirestoreDocument<User> =
        this.afs.doc('users/${user.uid}');
        console.log('updateUserData displayname = ' + user.displayname);
        console.log('updateUserData user.pseudo =' + user.pseudo);
      // this.af.collection('users').doc('users/${user.uid}').set(Object.assign({}, user))
      // console.log(user.pseudo);

        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          pseudo: user.pseudo
          };
// return userRef.update(data, { create: true });
// j'essai d'assigner l'objet
// return userRef.set(Object.assign(data));
//  return userRef.update(data);
 // return userRef.set(data, { merge: true});

// user.pseudo = this.user.pseudo;
 /* if ( user.pseudo != null ) {
  user.pseudo = this.user.pseudo;
  // this.user = user;
 } else { */

   return userRef.set (data, { merge: true});
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
