import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CachingService } from 'src/app/shared/caching.service';
import { IBook, ICart } from '../shared/book.model';
import { BooksService } from '../shared/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: IBook;
  amount = 1;
  constructor(private route: ActivatedRoute, private bookService: BooksService, private cachingService: CachingService) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id')
    if (bookId) {
      this.getDetail(bookId);
    }

  }

  getDetail(id: string) {
    this.bookService.getDetailById(id).subscribe(b => {
      this.book = b;
    });
  }

  add() {
    this.amount += 1;
  }

  addToCart() {
    const cartStored = this.cachingService.localStorage.get('Cart') as ICart || { Items: [] };
    if (cartStored.Items.findIndex(i => i.Item.id === this.book.id) !== -1) { // can not add item to cart if it is existed
      window.alert('Item is existed in cart, please check shopping cart')
    } else {
      cartStored.Items.push({ Item: this.book, Amount: this.amount });
      this.cachingService.localStorage.store('Cart', cartStored);
    }
  }

  remove() {
    if (this.amount > 1) {
      this.amount -= 1;
    }
  }
}
