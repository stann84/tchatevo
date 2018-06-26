import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
// import { AngularFireDatabase, } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor () {
    const config = {
      apiKey: 'AIzaSyDUIriGK6nijTlBRtwUcDWKsQcfgvuMLbo',
      authDomain: 'books-3bd5d.firebaseapp.com',
      databaseURL: 'https://books-3bd5d.firebaseio.com',
      projectId: 'books-3bd5d',
      storageBucket: 'books-3bd5d.appspot.com',
      messagingSenderId: '373231675965'
    };
    firebase.initializeApp(config);
}}
