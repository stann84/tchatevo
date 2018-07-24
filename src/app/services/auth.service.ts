import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
// import { User } from './auth-custom';
// import { User } from '../models/User.model';


interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  // statut?: string;
  pseudo?: string;
  // username?: string;

}
@Injectable()
export class AuthService {
    user: Observable<User>;
    router: Router;
    errorMessage: any;
    currentUser: User;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private db: AngularFireDatabase,
              private formBuilder: FormBuilder) {

    // essai depuis le tuto
    /* this.afAuth.authState
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
    }); */

    // Connexion google ok mais le subscribe ne fonctionne pas

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
    console.log('L updateuserdata');
    const userRef: AngularFirestoreDocument<User> =
      this.afs.doc(`users/${user.uid}`);

      console.log(`users/${user.email}${user.pseudo}`);

     /*  getJsonData(){
        return this.http.get('http://URL_TO_JSON_FILE').map(res => res.json());
      } */

    // const pseudo = (`${user.pseudo}`);
   // user.pseudo = this.afs.collection('users').doc('pseudo');

    /* pseudoRef.get().then(function(doc) {
      if (doc.exists) {
         user.pseudo =  (`${user.pseudo}`);
        console.log('Document data:', doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
    }
  }).catch(function(error) {
    console.log('Error getting document:', error);
  }); */

    /*
      user.pseudo.get().then(function(doc) {
        if (doc.exists) {
            console.log('Document data:', doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
        }
    }).catch(function(error) {
        console.log('Error getting document:', error);
    }); */

    /* this.afs.doc(`users/${user.uid}.collection${user.pseudo}`).ref.get().then((documentSnapshot) => {
      console.log(documentSnapshot.exists);
    }); */

    /* user.pseudo = this.afs . collection ( `users/${user.uid}`); */
    /*  user.pseudo = this.afs.doc(`users/${user.uid}`)
     .ref.get().then((documentSnapshot) => {
      console.log('afs' + user.pseudo);
    }, (error) => {
      this.errorMessage = error;
    }
    ); */

    /*  const pseudoRef = userRef . collection(user.uid) . doc('pseudo');
     user.pseudo = pseudoRef; */

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
      pseudo: user.pseudo
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
  /* checkPseudo() {
    this.user.checkPseudo(this.pseudoText).subscribe(pseudo => {
      this.pseudoResult= !pseudo.$value
    });
  } */
}
