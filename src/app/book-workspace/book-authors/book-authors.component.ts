import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BookState } from 'src/app/state/app.state';
import { selectBookAuthors } from 'src/app/state/book/book.selectors';

@Component({
  selector: 'app-book-authors',
  templateUrl: './book-authors.component.html',
  styleUrls: ['./book-authors.component.scss']
})
export class BookAuthorsComponent implements OnInit {
  authors$ = this.store.pipe(select(selectBookAuthors));
  @Output() authorClick = new EventEmitter();
  @Input() selectedAuthor: string;
  constructor(private store: Store<BookState>) { }

  ngOnInit(): void {
  }

}
