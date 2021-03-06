import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CachingService } from './shared/caching.service';
import { AuthState } from './state/app.state';
import { loginSucess } from './state/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BookStore';
  constructor(
    private store: Store<AuthState>,
    private _cachedService: CachingService
  ) { }

  ngOnInit() {
    const userInfor = this._cachedService.localStorage.get(`userInfor`);
    if (userInfor) {
      this.store.dispatch(loginSucess({payload: userInfor}));
    }
  }
}
