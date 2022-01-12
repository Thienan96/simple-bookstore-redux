import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { IBook } from '../../shared/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book?: IBook;
  @Input() showBtnAddToCart: boolean = true;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    if (!this.book) return;
    this._cartService.addToCart(this.book, 1);
  }

}
