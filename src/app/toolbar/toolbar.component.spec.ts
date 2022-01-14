import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of, fromEvent } from 'rxjs';
import { CachingService } from '../shared/caching.service';
import { AuthReducer } from '../state/auth/auth.reducers';
import * as rxjs from 'rxjs';

import { ToolbarComponent } from './toolbar.component';
class MatSnackBarStub {
  open() {
    return {
      onAction: () => of({})
    }
  }
}

class ActivatedRouteMock {
  queryParams = new Observable(observer => {
    const urlParams = {
      intitle: 'some',
    }
    observer.next(urlParams);
    observer.complete();
  });
}
describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

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
      declarations: [ToolbarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ auth: AuthReducer }),
      ],
      providers: [
        { provide: CachingService, useValue: cachingService },
        { provide: MatDialog, useClass: MatSnackBarStub },
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock
        },
      ]
    })
      .compileComponents();
    const store = TestBed.get(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test buildURL', () => {
    const value = '';
    component.buildURL(value);
  });

  it('test buildURL', () => {
    const value = 'aaa';
    component.buildURL(value);
  });


  it('test login', () => {
    spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);
    component.login();
  });

  it('test logout', () => {
    component.logout();
  });

  it('test signUp', () => {
    component.signUp();
  });

  it('test viewProfile', () => {
    component.viewProfile();
  });

});
