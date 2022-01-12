import { IBook } from "../book-workspace/shared/book.model";

export interface BookState {
  books: Array<IBook>;
  booksVistRecently: IBook[];
}

export interface AuthState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: any;
  // error message
  errorMessage: string | null;
}