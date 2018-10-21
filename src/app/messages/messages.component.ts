import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import '@firebase/messaging';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/map';
import { User } from '../models/User.model';
import { UsersService } from '../services/users.service';
import { UserProfilComponent } from '../user-profil/user-profil.component';
import { auth } from '../../../node_modules/firebase';
import { UpdateUserComponent } from '../user-form/update-user/update-user.component';
import { Subscriber } from '../../../node_modules/rxjs';

interface Post {
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
  // users: User[];
  // user = this.authService.user;
    public users: Observable<any[]>;
   

  postsCol: AngularFirestoreCollection<Post>;
  posts: any;

  postDoc: AngularFirestoreDocument<Post>;
  post: Observable<Post>;

  content: string;
  // displayName: string;

 constructor(private afs: AngularFirestore,
            private auth: AuthService,
            private authService: AuthService,
            private afAuth: AngularFireAuth
          ) {
            this.users= afs.collection('users').valueChanges();
 }

// displayName : AngularFirestoreDocument<User> = this.afs.doc(`users/${ this.displayName }`);
// declarer la valeur de pseudo ici !


/*  pseudo = this.afAuth.authState
.switchMap(user => {
  if (user) {
    return this.afs.doc<User>(`users/${user.uid}`)
      .valueChanges();
  } else {
    return Observable.of(null);
  }
}); */
// pseudo = this.user.pseudo
  // pseudo = this.afs.collection(`users`).doc(`pseudo`);
  // pseudo = this.afs.doc("user/pseudo");
  // pseudo = this.afs.collection(`users`)
  // pseudo = JSON.stringify(this.afs.collection(`users`). doc ( 'uid' ));

 // afs.database.lu
  
  ngOnInit() {
    this.authService.getUser().subscribe(users => {
       console.log (users.displayName); 
      });
   // console.log(user.displayName) 

// console.log(this.displayName)
 // displayName = this.authService.users.displayName   
// var user = firebase.auth().currentUser;
  //  console.log(JSON.stringify(this.afs.collection(`users`). doc ( 'uid' )));
 // console.log('JSON.stringify',JSON.stringify(this.user.pseudo));
 //  this.pseudo = this.afs.collection(`users/${this.pseudo}`);
   

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
  // displayName = users.displayName;
/*  displayName = this.authService.getUser(this.displayName).subscribe(users => {
 // console.log(users.displayName) 
  return 1
   }); */
/* displayName = this.authService.getUser().subscribe(users => {
  console.log('users.displayName = ' + users.displayName)
 this.displayName = users.displayName
}) */

displayName = this.users['displayName'] 

 onAddPost() {
    this.afs.collection('posts')
  .add({
    'displayName': this.displayName,
    'content': this.content});
 // console.log('content = ' + this.displayName)
  }
// je recupere l Id des post
  getPost(postId) {
    this.postDoc = this.afs.doc('posts/'+postId);
    this.post = this.postDoc.valueChanges();
    console.log('post  = ' + this.post);
   // console.log(this.displayName);
  }

 /* // je récupere le pseudo 
 getPseudo(pseudo) {
  this.postDoc = this.afs.doc('users/'+pseudo);
  this.post = this.postDoc.valueChanges();
  console.log(pseudo)
} */
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
