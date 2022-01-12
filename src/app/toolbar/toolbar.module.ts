import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SocicalLoginPageModule } from '../socical-login-page/socical-login-page.module';
import { EnrollFormModule } from '../enroll-form/enroll-form.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../shared/cart.service';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    SocicalLoginPageModule,
    EnrollFormModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatMenuModule
  ],
  exports: [ToolbarComponent],
  providers: [CartService]
})
export class ToolbarModule { }
