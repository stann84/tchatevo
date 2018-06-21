import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Book} from '../models/Book.model';
import * as firebase from 'firebase';

@Injectable()
// on creer la classe
export class BooksService {
  // on importe Book depuis le model et on creer un array vide
  books: Book [] = [];
  // on creer un subjecte de l'array
  booksSubject = new Subject<Book[]>();

  constructor() { }
  // on emmet les Books
  emitBooks() {
    this.booksSubject.next(this.books);
  }
  // sauvegarder dans firebase
  saveBooks() {
    firebase.database().ref('books')
      .set(this.books);
  }
// on affiche les livres si il n'y a pas de livre on affiche un array vide
  getBooks() {
    firebase.database().ref('books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }
  // afficher un seul livre
  getSignleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
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
  createNewBook(newBook: Book) {
    // ajout le livre a l'array des books
    this.books.push(newBook);
    // les enregistre
    this.saveBooks();
    // emet le subject
    this.emitBooks();
  }

 // supprimer un livre
  removeBook (book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
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
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

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
