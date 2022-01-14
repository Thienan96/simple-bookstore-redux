import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CachingService } from '../shared/caching.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [StoreModule.forRoot({}),
        ReactiveFormsModule,
        FormsModule],
      providers: [
        { provide: CachingService, useValue: cachingService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit', () => {
    component.loginForm.controls['Username'].setValue('test') // This will trigger change
    component.ngOnInit();
  });

  it('test onSubmit', () => {
    const value = { id: 8, Id: 8, Username: "an an", Email: "nguyenhoathienan@gmail.com", Phone: "123", Address: "123", Password: "", ConfirmPassword: "" }
    component.onSubmit(value);
  });

  it('test onSubmit else', () => {
    const value = { id: 8, Id: 8, Username: "in valid user", Email: "nguyenhoathienan@gmail.com", Phone: "123", Address: "123", Password: "", ConfirmPassword: "" }
    component.onSubmit(value);
  });

});
