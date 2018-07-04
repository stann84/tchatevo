import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {User} from '../models/User.model';
import * as firebase from 'firebase/app';

@Injectable()
// on creer la classe
export class UsersService {
  // on importe User depuis le model et on creer un array vide
  users: User [] = [];
  // on creer un subjecte de l'array
  usersSubject = new Subject<User[]>();

  constructor() { }
  // on emmet les Users
  emitUsers() {
    this.usersSubject.next(this.users);
  }
  // sauvegarder dans firebase
  saveUsers() {
    firebase.database().ref('users')
      .set(this.users);
  }
// on affiche les livres si il n'y a pas de livre on affiche un array vide
  getUsers() {
    firebase.database().ref('users')
      .on('value', (data) => {
        this.users = data.val() ? data.val() : [];
        this.emitUsers();
      });
  }
  // afficher un seul livre
  getSignleUser(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
          );
      }
      );
  }
  // creer un livre
  createNewUser(newUser: User) {
    // ajout le livre a l'array des users
    this.users.push(newUser);
    // les enregistre
    this.saveUsers();
    // emet le subject
    this.emitUsers();
  }

 // supprimer un livre
 /*
  removeUser (user: User) {
    if (user.photo) {
      const storageRef = firebase.storage().refFromURL(user.photo);
      storageRef.delete().then(
        () => {
          console.log('photo supprimée');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé :' + error);
        }
      );
    }
    const userIndexToRemove = this.users.findIndex(
      (userEl) => {
        if (userEl === user) {
          return true;
        }
      }
    );
    this.users.splice(userIndexToRemove, 1);
    this.saveUsers();
    this.emitUsers();
  }
*/
  // ajouter un photo
  uploadFile(file: File) {
    return new Promise (
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('chargement ...');
        },
          (error) => {
          console.log ('erreur de chargement' + error);
          reject();
          },
          () => {

              resolve(upload.snapshot.ref.getDownloadURL());
            }
        );
      }
    );
  }

}
