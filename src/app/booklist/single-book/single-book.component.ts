import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/Book.model';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private   router: Router) { }

  ngOnInit() {
    // on créer d'abord un book vide temporaraire pour eviter les erreur au cas ou il ne soit pas arriver
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSignleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }
  onBack() {
    this.router.navigate(['/books']);
  }

}
