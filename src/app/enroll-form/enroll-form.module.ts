import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollFormComponent } from './enroll-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CachingService } from '../shared/caching.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    EnrollFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [EnrollFormComponent],
  providers: [CachingService, MatSnackBar]
})
export class EnrollFormModule { }
