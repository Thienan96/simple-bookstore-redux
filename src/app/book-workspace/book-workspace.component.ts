import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IAppState } from '../state/app.state';
import { getBookList, searchBookTitle } from '../state/book/book.action';

@Component({
  selector: 'app-book-workspace',
  templateUrl: './book-workspace.component.html',
  styleUrls: ['./book-workspace.component.scss']
})
export class BookWorkspaceComponent implements OnInit {
  seachText: string;
  selectedAuthor: string;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  constructor(private store: Store<IAppState>,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        this.seachText = params.intitle ? params.intitle : '';
        this.selectedAuthor = params.inauthor ? params.inauthor : '';
        this.store.dispatch(searchBookTitle({ QueryCondition: params }));
      } else {
        this.seachText = '';
        this.selectedAuthor = '';
        this.store.dispatch(getBookList());
      }
    });
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , debounceTime(1000)
      , distinctUntilChanged()

    ).subscribe((text: string) => {
      const inauthor = this.route.snapshot.queryParamMap.get('inauthor');
      this.buildURL(text, inauthor);
    });
  }

  onAuthorClick(author: string) {
    const intitle = this.route.snapshot.queryParamMap.get('intitle');
    this.buildURL(intitle, author);
  }

  buildURL(intitle: string | null, inauthor: string | null) {
    let queryParams = {};
    if (intitle) {
      queryParams = { ...queryParams, intitle: intitle }
    }
    if (inauthor) {
      queryParams = { ...queryParams, inauthor: inauthor }
    }
    this.router.navigate(['/'], { queryParams });
  }
}
