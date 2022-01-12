import { createAction, props } from '@ngrx/store';
import { IBook } from 'src/app/book-workspace/shared/book.model';

export const getBookList = createAction(
    '[GET_BOOK_LIST] Get Book List',
    props<{ QueryCondition: {} }>()
);

export const getBookListSucess = createAction(
    '[GET_BOOK_LIST_SUCCESS] Get Book List Success',
    props<{ Book: Array<IBook> }>()
);

export const getBookListFailed = createAction(
    '[GET_BOOK_LIST_FAILED] Get Book List Failed',
    props<{ Error: any }>()
);

export const getBookDetail = createAction(
    '[GET_BOOK_DETAIL] Get Book Detail',
    props<{ Id: string }>()
);

export const getBookDetailSucess = createAction(
    '[GET_BOOK_DETAIL_SUCCESS] Get Book Detail Success',
    props<{ Book: IBook }>()
);

export const getBookDetailFailed = createAction(
    '[GET_BOOK_DETAIL_FAILED] Get Book Detail Failed',
    props<{ Error: any }>()
);

export const visitBook = createAction(
    '[VISIT_BOOK] Vist Book',
    props<{ Book: IBook }>()
);

