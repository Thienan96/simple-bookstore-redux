import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, StoreModule } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';
import { of } from 'rxjs';
import { CachingService } from '../shared/caching.service';

import { EnrollFormComponent } from './enroll-form.component';
class MatSnackBarStub {
  open() {
    return {
      onAction: () => of({})
    }
  }
}
describe('EnrollFormComponent', () => {
  let component: EnrollFormComponent;
  let fixture: ComponentFixture<EnrollFormComponent>;
  const dialogRef = {
    close: () => { }
  };
  beforeEach(async () => {
    const cachingService = {
      localStorage: {
        get(key: string) {
          if (key === 'userInfor') {
            return {
              Address: "123",
              ConfirmPassword: "123",
              Email: "test@gmail.com",
              Id: 77,
              Password: "123",
              Phone: "123",
              Username: "123",
            }
          } else if (key === 'UserList') {
            return [{ id: 77, Id: 77, Username: "123", Email: "test@gmail.com", Phone: "123", Address: "123", Password: "123", ConfirmPassword: "123" },
            { id: 8, Id: 8, Username: "an an", Email: "nguyenhoathienan@gmail.com", Phone: "123", Address: "123", Password: "", ConfirmPassword: "" },
            { id: "100056706574050970445", Id: "100056706574050970445", Username: "an an", Email: "nguyenhoathienan@gmail.com", Phone: 123, Address: "123", Password: "", ConfirmPassword: "" }];
          } else {
            return '';
          }
        },
        store(key: string) {
          return '';
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [EnrollFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}),
        ReactiveFormsModule,
        FormsModule],
      providers: [
        { provide: CachingService, useValue: cachingService },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { action: 'update-profile' } },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
      ]
    })
      .compileComponents();
    const store = TestBed.get(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('test ngOnInit', () => {
    it('test ngOnInit', () => {
      component.initData = <any>{ Id: 77, Username: "123", Email: "test@gmail.com", Phone: "123", Address: "123", Password: "123", ConfirmPassword: "123" }
      expect(component.enrollForm.get('Password')).toBeTruthy();
      component.ngOnInit();
    });
  })

  it('test checkPasswords', () => {
    component.enrollForm.patchValue({ PassWord: 123, ConfirmPassword: 1234 })
    component.checkPasswords();
  });

  describe('test onSubmit', () => {
    it('test submit', () => {
      const value = { id: 8, Id: 8, Username: "an an", Email: "nguyenhoathienan@gmail.com", Phone: "123", Address: "123", Password: "", ConfirmPassword: "" };
      component.onSubmit(value);
    });
    it('test submit', () => {
      const value = {id:123123, Id: 123123, Username: "an an", Email: "nguyenhoathienan@gmail.com", Phone: "123", Address: "123", Password: "", ConfirmPassword: "" };
      component.onSubmit(value);
    });

  })
  it('test close', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.close();
    expect(spy).toHaveBeenCalled();
  });
});
describe('EnrollFormComponent', () => {
  let component: EnrollFormComponent;
  let fixture: ComponentFixture<EnrollFormComponent>;
  const dialogRef = {
    close: () => { }
  };
  beforeEach(async () => {
    const cachingService = {
      localStorage: {
        get(key: string) {
          if (key === 'userInfor') {
            return {
              Address: "123",
              ConfirmPassword: "123",
              Email: "test@gmail.com",
              Id: 77,
              Password: "123",
              Phone: "123",
              Username: "123",
            }
          } else if (key === 'UserList') {
            return [{ id: 77, Id: 77, Username: "123", Email: "test@gmail.com", Phone: "123", Address: "123", Password: "123", ConfirmPassword: "123" },
            { id: 8, Id: 8, Username: "an an", Email: "nguyenhoathienan@gmail.com", Phone: "123", Address: "123", Password: "", ConfirmPassword: "" },
            { id: "100056706574050970445", Id: "100056706574050970445", Username: "an an", Email: "nguyenhoathienan@gmail.com", Phone: 123, Address: "123", Password: "", ConfirmPassword: "" }];
          } else {
            return '';
          }
        },
        store(key: string) {
          return '';
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [EnrollFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}),
        ReactiveFormsModule,
        FormsModule],
      providers: [
        { provide: CachingService, useValue: cachingService },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { action: '' } },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
      ]
    })
      .compileComponents();
    const store = TestBed.get(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('test onSubmit data?.action !== update-profile', () => {
    it('test submit', () => {
      component.initData = <any>{ Id: 77, Username: "123", Email: "test@gmail.com", Phone: "123", Address: "123", Password: "123", ConfirmPassword: "123" }
      const value = {id:123123, Id: 123123, Username: "an an", Email: "nguyenhoathienan@gmail.com", Phone: "123", Address: "123", Password: "", ConfirmPassword: "" };
      component.onSubmit(value);
    });

  })
});