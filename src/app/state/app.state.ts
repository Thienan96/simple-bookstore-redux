import { IBook } from "../book-workspace/shared/book.model";

export interface IAppState {
  books: Array<IBook>;
}
