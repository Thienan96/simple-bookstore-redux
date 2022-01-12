import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CachingService } from 'src/app/shared/caching.service';
import { CartService } from 'src/app/shared/cart.service';
import { IBook, ICart } from '../shared/book.model';
import { BooksService } from '../shared/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book$: Observable<IBook>;
  amount = 1;
  constructor(private route: ActivatedRoute, private bookService: BooksService, private _cartService: CartService) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id')
    if (bookId) {
      this.book$ = this.getDetail(bookId);
    }

  }

  getDetail(id: string): Observable<IBook> {
    return this.bookService.getDetailById(id);
  }

  add() {
    this.amount += 1;
  }

  remove() {
    if (this.amount > 1) {
      this.amount -= 1;
    }
  }

  addToCart(book: IBook) {
    this._cartService.addToCart(book, this.amount);
  }
}
