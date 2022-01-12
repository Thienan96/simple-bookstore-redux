import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CachingService } from 'src/app/shared/caching.service';
import { BookState } from 'src/app/state/app.state';
import { selectBooksVisitRecently } from 'src/app/state/book/book.selectors';

@Component({
  selector: 'app-visit-recently',
  templateUrl: './visit-recently.component.html',
  styleUrls: ['./visit-recently.component.scss']
})
export class VisitRecentlyComponent {
  showBtnAddToCart: boolean = false;
  booksVisitRecently$ = this.store.pipe(select(selectBooksVisitRecently));
  constructor(private store: Store<BookState>) { }

}
