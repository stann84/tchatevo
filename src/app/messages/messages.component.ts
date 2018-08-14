import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import '@firebase/messaging';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/map';
import { User } from '../models/User.model';

interface Post {
  content: string;
  user: string;
  pseudo: string;
}
// id pour le post
interface PostId extends Post {
  id: string;
}
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
 export class MessagesComponent implements OnInit {
   user = this.auth.user;

  postsCol: AngularFirestoreCollection<Post>;
  posts: any;

   content: string;

   postDoc: AngularFirestoreCollection<Post>;
   post: Observable<Post>;

 constructor(private afs: AngularFirestore,
            private auth: AuthService,
            private afAuth: AngularFireAuth
          ) {
 }
// ici ca marche
 pseudo = this.afs.collection(`users`).doc(`pseudo`);

 ngOnInit() {console.log('obj', this.pseudo)
 console.log('JSON.stringify',JSON.stringify(this.user));
 //  this.pseudo = this.afs.collection(`users/${this.pseudo}`);


this.user = this.afAuth.authState
.switchMap(user => {
  if (user) {
    return this.afs.doc<User>(`users/${user.uid}`)
      .valueChanges();
  } else {
    return Observable.of(null);
  }
});
 

// je creer le post
    this.postsCol = this.afs.collection('posts');
    this.posts = this.postsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }
  /* getPseudo(){
     console.log(this.pseudo);
  } */




// j'envoie le message avec le pseudo de l'utilisateur et le message
 onAddPost() {
  this.afs.collection('posts')
  .add({
    'pseudo': this.pseudo,
    'content': this.content});
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
