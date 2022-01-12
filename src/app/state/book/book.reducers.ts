import { createReducer, on, Action, State } from '@ngrx/store';
import { BookState } from '../app.state';
import { getBookList, getBookListFailed, getBookListSucess, visitBook, } from './book.action';


export const initialState: BookState = {
    books: [],
    booksVistRecently: []
};
const reducer = createReducer(
    initialState,
    on(getBookList, (state) => state),
    on(getBookListSucess, (state, { Book }) => ({ ...state, books: Book })),
    on(getBookListFailed, (state) => state),
    on(visitBook, (state, { Book }) => ({ ...state, booksVistRecently: [Book, ...state.booksVistRecently.filter(b => b.id !== Book.id)] })),
);

export function BooksReducer(state = initialState, action: Action) {
    return reducer(state, action);
}

