import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BookState } from '../state/app.state';
import { getBookList } from '../state/book/book.action';
@Component({
  selector: 'app-book-workspace',
  templateUrl: './book-workspace.component.html',
  styleUrls: ['./book-workspace.component.scss']
})
export class BookWorkspaceComponent implements OnInit {
  seachText: string;
  selectedAuthor: string;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  constructor(private store: Store<BookState>,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onQueryChange($event: string) {
    this.store.dispatch(getBookList({ QueryCondition: { intitle: $event } }));
  }
}
