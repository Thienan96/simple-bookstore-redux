import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthState } from '../state/app.state';
import { login, logout } from '../state/auth/auth.actions';
import { selectAuth } from '../state/auth/auth.selector';

@Component({
  selector: 'app-socical-login-page',
  templateUrl: './socical-login-page.component.html',
  styleUrls: ['./socical-login-page.component.scss']
})
export class SocicalLoginPageComponent implements OnInit {
  userLogined$ = this.store.pipe(select(selectAuth));
  constructor(
    private socialAuthService: SocialAuthService,
    private store: Store<AuthState>,
    public dialogRef: MatDialogRef<SocicalLoginPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
  }

  loginWithGoogle(): void {
    this.store.dispatch(login());
  }

  logOut(): void {
    this.store.dispatch(logout());
  }

  close(): void {
    this.dialogRef.close();
  }
}
