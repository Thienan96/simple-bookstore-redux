import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/state/app.state';
import { getBookList } from 'src/app/state/book/book.action';
import { selectBooks } from 'src/app/state/book/book.selectors';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books$ = this.store.pipe(select(selectBooks));
  constructor(private store: Store<IAppState>, private route: ActivatedRoute) { }
  ngOnInit(): void {
  }

  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
}
