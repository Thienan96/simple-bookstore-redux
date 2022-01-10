import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { from, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { CachingService } from 'src/app/shared/caching.service';
import { BookState } from '../app.state';
import * as AuthActions from './auth.actions'

@Injectable()
export class AuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap(() => from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID))
            .pipe(
                concatMap(() => this.socialAuthService.authState),
                map((payload) => {
                    if (payload) {
                        // this.cachingService.localStorage.store(`userId`, payload.id);
                        this.cachingService.localStorage.store(`authInfor`, payload);
                        return AuthActions.loginSucess({ payload });
                    } else {
                        return AuthActions.loginFailed({ payload })
                    }
                }),
                catchError((payload) => of(AuthActions.loginFailed({ payload })))
            ))
    )
    );

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        mergeMap(() => from(this.socialAuthService.signOut(true))
            .pipe(
                concatMap(() => this.socialAuthService.authState),
                map((payload) => {
                    this.cachingService.localStorage.removeAll();
                    return AuthActions.logoutSucess();
                }),
                catchError((payload) => of(AuthActions.logoutFailed({ payload })))
            ))
    )
    );
    constructor(
        private actions$: Actions,
        private cachingService: CachingService,
        private socialAuthService: SocialAuthService,
        private store: Store<BookState>
    ) { }
}