import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { LoginModule } from '../login/login.module';
import { AuthEffects } from '../state/auth/auth.effects';
import { AuthReducer } from '../state/auth/auth.reducers';

import { SocicalLoginPageComponent } from './socical-login-page.component';
describe('SocicalLoginPageComponent', () => {
  let component: SocicalLoginPageComponent;
  let fixture: ComponentFixture<SocicalLoginPageComponent>;
  const dialogRef = {
    close: () => { }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocicalLoginPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({auth: AuthReducer}),
        EffectsModule.forRoot()
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { action: '' } },
      ]
    })
      .compileComponents();
    const store = TestBed.get(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocicalLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test loginWithGoogle', () => {
    component.loginWithGoogle()
  });

  it('test logOut', () => {
    component.logOut()
  });

  it('test close', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.close();
    expect(spy).toHaveBeenCalled();
  });
});
