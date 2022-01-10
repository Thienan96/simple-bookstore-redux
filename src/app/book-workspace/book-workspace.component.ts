import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EnrollFormComponent } from '../enroll-form/enroll-form.component';
import { SocicalLoginPageComponent } from '../socical-login-page/socical-login-page.component';
import { BookState } from '../state/app.state';
import { logout } from '../state/auth/auth.actions';
import { selectAuth } from '../state/auth/auth.selector';
import { getBookList, searchBookTitle } from '../state/book/book.action';

@Component({
  selector: 'app-book-workspace',
  templateUrl: './book-workspace.component.html',
  styleUrls: ['./book-workspace.component.scss']
})
export class BookWorkspaceComponent implements OnInit {
  seachText: string;
  selectedAuthor: string;
  userLogined$ = this.store.pipe(select(selectAuth));
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  constructor(private store: Store<BookState>,
    public dialog: MatDialog,
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

  login(): void {
    const dialogRef = this.dialog.open(SocicalLoginPageComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout() {
    this.store.dispatch(logout())
  }

  signUp() {
    const dialogRef = this.dialog.open(EnrollFormComponent, {
      width: '350px',
    });
  }
}
