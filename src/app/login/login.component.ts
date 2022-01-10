import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CachingService } from '../shared/caching.service';
import { loginSucess } from '../state/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() loginSucess = new EventEmitter();
  loginForm: FormGroup;
  invalidUser: boolean;
  constructor(
    private _fb: FormBuilder,
    private _store: Store,
    private _cachingService: CachingService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.invalidUser = false;
    })
  }

  onSubmit(value: any) {
    const userRigisted = this._cachingService.localStorage.get('userInfor');
    if (userRigisted) {
      if (value.Username === userRigisted.Username && value.Password === userRigisted.Password) {
        this._store.dispatch(loginSucess({ payload: userRigisted }));
        this.loginSucess.emit();
      }
    } else {
      this.invalidUser = true;
    }
  }



}
