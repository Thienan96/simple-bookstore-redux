import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BookEffects } from '../state/book/book.effects';
import { BooksReducer } from '../state/book/book.reducers';
import { BookListComponent } from './book-list/book-list.component';
import { BookWorkspaceComponent } from './book-workspace.component';
import { BooksService } from './shared/book.service';
import { BookCardComponent } from './book-list/book-card/book-card.component';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { BookAuthorsComponent } from './book-authors/book-authors.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { BookDetailComponent } from './book-detail/book-detail.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { CachingService } from '../shared/caching.service';
import { CartComponent } from './cart/cart.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
const routes: Routes = [
  {
    path: '',
    component: BookWorkspaceComponent,
  },
  {
    path: 'detail/:id',
    component: BookDetailComponent,
  },
  {
    path: 'shopping-cart',
    component: CartComponent,
  },
];
@NgModule({
  declarations: [
    BookWorkspaceComponent,
    BookListComponent,
    BookCardComponent,
    BookAuthorsComponent,
    BookDetailComponent,
    CartComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([BookEffects]),
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule
  ],
  providers: [BooksService, CachingService],
  bootstrap: [],
  entryComponents: [ConfirmDialogComponent]
})
export class BookWorkspaceModule { }
