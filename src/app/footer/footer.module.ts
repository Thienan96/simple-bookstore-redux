import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleMapsModule } from '@angular/google-maps';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
      CommonModule,
      FlexLayoutModule,
      GoogleMapsModule
  ],
  exports: [FooterComponent],
  providers: [],
})
export class FooterModule { }