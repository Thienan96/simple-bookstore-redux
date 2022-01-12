import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { BooksReducer } from './state/book/book.reducers';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './state/book/book.effects';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterModule } from './footer/footer.module';
import { AuthReducer } from './state/auth/auth.reducers';
import { CachingService } from './shared/caching.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FooterModule,
    StoreModule.forRoot({ books: BooksReducer, auth: AuthReducer }),
    EffectsModule.forRoot([BookEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  providers: [CachingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
