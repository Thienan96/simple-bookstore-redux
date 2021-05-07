import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { IBook } from 'src/app/book-workspace/shared/book.model';
import { BooksService } from 'src/app/book-workspace/shared/book.service';
import { IAppState } from '../app.state';
import * as BookActions from './book.action'
@Injectable()
export class BookEffects {

    getBook$ = createEffect(() => this.actions$.pipe(
        ofType(BookActions.getBookList),
        mergeMap(() => this.booksService.getBookList()
            .pipe(
                map((Book) => BookActions.getBookListSucess({ Book })),
                catchError((Error) => of(BookActions.getBookListFailed({ Error })))
            ))
    )
    );
    // merge wit this.store.select(state => state.....)
    searchBook$ = createEffect(() => this.actions$.pipe(
        ofType(BookActions.searchBookTitle),
        mergeMap(action => this.booksService.searchBookList(action.QueryCondition)
            .pipe(
                map((Book) => BookActions.searchBookTitleSucess({ Book })),
                catchError((Error) => of(BookActions.searchBookTitleFailed({ Error })))
            ))
    )
    );
    constructor(
        private actions$: Actions,
        private booksService: BooksService,
        private store: Store<IAppState>
    ) { }
}