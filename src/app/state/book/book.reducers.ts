import { createReducer, on, Action, State } from '@ngrx/store';
import { IBook } from 'src/app/book-workspace/shared/book.model';
import { BookState } from '../app.state';
import { getBookList, getBookListFailed, getBookListSucess, searchBookTitle, searchBookTitleFailed, searchBookTitleSucess } from './book.action';


export const initialState: BookState = {
    books: [],
};
const reducer = createReducer(
    initialState,
    on(getBookList, (state) => state),
    on(getBookListSucess, (state, { Book }) => ({...state, books: Book})),
    on(getBookListFailed, (state) => state),
    on(searchBookTitle, (state) => state),
    on(searchBookTitleSucess, (state, { Book }) => ({...state, books: Book})),
    on(searchBookTitleFailed, (state) => state),
);

export function BooksReducer(state = initialState, action: Action) {
    return reducer(state, action);
}

