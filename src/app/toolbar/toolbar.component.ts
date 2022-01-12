import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { EnrollFormComponent } from '../enroll-form/enroll-form.component';
import { CartService } from '../shared/cart.service';
import { SocicalLoginPageComponent } from '../socical-login-page/socical-login-page.component';
import { logout } from '../state/auth/auth.actions';
import { selectAuth } from '../state/auth/auth.selector';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  @Output() queryChange: EventEmitter<string> = new EventEmitter();
  seachText: string;
  userLogined$ = this.store.pipe(select(selectAuth));
  itemsOnCart$ = this.cartService.itemsOnCart
  constructor(
    private store: Store,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        this.seachText = params.intitle ? params.intitle : '';
      } else {
        this.seachText = '';
      }
      this.queryChange.emit(this.seachText);
    });
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , debounceTime(1000)
      , distinctUntilChanged()

    ).subscribe((text: string) => {
      this.queryChange.emit(text);
      this.buildURL(text);
    });
  }

  buildURL(intitle: string | null) {
    let queryParams = {};
    if (intitle) {
      queryParams = { ...queryParams, intitle: intitle }
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
    this.router.navigate(['/']);
  }

  signUp() {
    const dialogRef = this.dialog.open(EnrollFormComponent, {
      width: '350px',
    });
  }
}
