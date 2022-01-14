import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocialUser } from 'angularx-social-login';
import { CachingService } from '../shared/caching.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { loginSucess } from '../state/auth/auth.actions';
@Component({
  selector: 'app-enroll-form',
  templateUrl: './enroll-form.component.html',
  styleUrls: ['./enroll-form.component.scss']
})
export class EnrollFormComponent implements OnInit {
  @Input() initData: SocialUser; // if initData !== null: user login by scocial account, should addition information for autofill when checking out
  enrollForm: FormGroup;
  title: 'Register' | 'Update' = 'Register';
  constructor(
    private _store: Store,
    public dialogRef: MatDialogRef<EnrollFormComponent>,
    private _cachingService: CachingService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { action: 'update-profile' } | null,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.enrollForm = this._fb.group({
      Id: [this.initData?.id || Math.floor(Math.random() * 100) + 1],
      Username: [this.initData?.name || '', Validators.required],
      Email: [this.initData?.email || '', [Validators.required, Validators.pattern(emailregex)]],
      Phone: ['', Validators.required],
      Address: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
    }, {
      validators: [
        this.checkPasswords()
      ]
    });
    if (this.initData) {
      this.enrollForm.get('Password')?.removeValidators(Validators.required);
      this.enrollForm.get('ConfirmPassword')?.removeValidators(Validators.required);
    }
    if (this.data?.action === 'update-profile') {
      const userInfor = this._cachingService.localStorage.get('userInfor') || {};
      this.enrollForm.patchValue(userInfor);
      this.title = 'Update';
    }
  }

  checkPasswords() {
    return (group: FormGroup) => {
      const pass = group.get('Password')?.value;
      const confirmPass = group.get('ConfirmPassword')?.value;
      if (pass && confirmPass && pass !== confirmPass) {
        group.get('ConfirmPassword')?.setErrors({ invalid: true });
      } else {
        if (!group.get('ConfirmPassword')?.hasError('required')) {
          group.get('ConfirmPassword')?.setErrors(null);
        }
      }
    };
  }

  onSubmit(value: any) {
    let userList = this._cachingService.localStorage.get('UserList') || [];
    this.close();
    if (this.data?.action === 'update-profile') {
      this._store.dispatch(loginSucess({ payload: value }));
      const userInfor = this._cachingService.localStorage.get('userInfor');
      userList = userList.map((u: any) => {
        if (u.id === value.id) {
          return value
        } else {
          return u;
        }
      })
      this._cachingService.localStorage.store('UserList', userList);
      this._cachingService.localStorage.store('userInfor', { ...userInfor, ...value });
    } else {
      if (this.initData) {
        const userInfor = this._cachingService.localStorage.get('userInfor');
        this._cachingService.localStorage.store('userInfor', { ...userInfor, ...value });
      }
      this._cachingService.localStorage.store('UserList', [...userList, value]);
      this._snackBar.open('Registrion successfully', 'Ok', {
        duration: 5000
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

}
