import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import '@firebase/messaging';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Post {
  title: string;
  content: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
 export class MessagesComponent implements OnInit, OnDestroy {
   postCol: AngularFirestoreCollection<Post>;
   posts: Observable<Post[]>;


 constructor(private afs: AngularFirestore) {

 }
title: string;
content: string;

 ngOnInit() {
   this.postCol = this.afs.collection('posts');
   this.posts = this.postCol.valueChanges();
 }

 addPost() {
  this.afs.collection('posts').add({'title': this.title, 'content': this.content});
}

 ngOnDestroy() {
   console.log('destroy');
 }
 }
  /*
  items: AngularFireList<any>;
  user: any;
  msgVal: '';

  public users: Observable<any[]>;

  constructor(public db: AngularFireDatabase,
              private afs: AngularFirestore) {
                this.users = afs.collection('/users').valueChanges();
                this.items = db.list('/messages');
  }
  chatSend(theirMessage: string) {
    this.items.push({message: theirMessage});
    this.msgVal = '';
  }
} */

/*constructor(public auth: AuthService) {
const messaging = firebase.messaging();

messaging.requestPermission()
.then(function() {
  console.log('permission ok');
  return messaging.getToken();
})
.then(function(token) {
  console.log(token);
})
 .catch(function(err) {
  console.log('Error Occured.');
});
messaging.onMessage(function(payload) {
console.log('onMessage : ', payload);
});
}
}*/
