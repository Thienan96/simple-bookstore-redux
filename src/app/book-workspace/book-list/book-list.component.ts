import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CachingService } from 'src/app/shared/caching.service';
import { BookState } from 'src/app/state/app.state';
import { getBookList, visitBook } from 'src/app/state/book/book.action';
import { selectBooks } from 'src/app/state/book/book.selectors';
import { IBook } from '../shared/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  gridColumns = 3;
  books$ = this.store.pipe(select(selectBooks));
  constructor(private store: Store<BookState>, private route: ActivatedRoute) { }
  ngOnInit(): void {
  }
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  visit(Book: IBook) {
    this.store.dispatch(visitBook({ Book }))
  }
}
