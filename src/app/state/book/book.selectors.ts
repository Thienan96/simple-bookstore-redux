import { createSelector, createFeatureSelector } from "@ngrx/store";
import { IBook } from "src/app/book-workspace/shared/book.model";
import { BookState } from "../app.state";

// export const selectBooks = createSelector(
//   (state: IAppState) => state.books,
//   (books: Array<IBook>) => books
// );
export const getBookState = createFeatureSelector<BookState>('books');
// export const getBookState = createFeatureSelector<IAppState>('books');
// export const getBookState = createFeatureSelector<IAppState>('books');

export const selectBooks = createSelector(
  getBookState,
  (state: BookState) => state.books
);

export const selectBookAuthors = createSelector(
  getBookState,
  (state: BookState) => {
    return state.books
      .map(b => b.volumeInfo.authors)
      .reduce((acc, curr: Array<string>) => {
        curr.forEach(a => {
          if (acc.indexOf(a) === -1) {
            acc.push(a)
          }
        });
        return acc;
      }, [])
  }
);