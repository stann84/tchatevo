import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../models/Book.model';
import {Subscription} from 'rxjs/Subscription';
import {BooksService} from '../services/books.service';
import {Router} from '@angular/router';
// afficher la liste des livres supprimer chaque livre naviguer pour creer un livre
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit , OnDestroy {

  // On créer l'array local des books pense a importer books et subscription
  books: Book[];
  booksSubscription: Subscription;

  // on injecte les services
  constructor(private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.emitBooks();
    this.booksService.getBooks();
  }

  // créer un nouveau livre
  onNewbook() {
    this.router.navigate(['/books', 'new']);
  }
  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
}
