import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IBook } from '../../shared/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book?: IBook;

  constructor() { }

  ngOnInit(): void {
  }

}
