import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBook } from './book.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
    constructor(private http: HttpClient) { }

    getBookList(): Observable<Array<IBook>> {
        return this.http
            .get<{ items: IBook[] }>(
                'https://www.googleapis.com/books/v1/volumes?q=+subject:Manga'
            )
            .pipe(map((books) => books.items || []));
    }

    searchBookList(queryCondition: any): Observable<Array<IBook>> {
        let url = 'https://www.googleapis.com/books/v1/volumes?q=+subject:Manga';
        if (queryCondition.intitle) {
            url += `+intitle:${queryCondition.intitle}`;
        }
        if (queryCondition.inauthor) {
            url += `+inauthor:${queryCondition.inauthor}`;
        }
        return this.http
            .get<{ items: IBook[] }>(url)
            .pipe(map((books) => books.items || []));
    }

    getDetailById(id: string): Observable<IBook> {
        return this.http
            .get<IBook>(
                `https://www.googleapis.com/books/v1/volumes/${id}`
            );
    }
}


/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/