import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocialUser } from 'angularx-social-login';
import { CachingService } from '../shared/caching.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-enroll-form',
  templateUrl: './enroll-form.component.html',
  styleUrls: ['./enroll-form.component.scss']
})
export class EnrollFormComponent implements OnInit {
  @Input() initData: SocialUser; // if initData !== null: user login by scocial account, should addition information for autofill when checking out
  enrollForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EnrollFormComponent>,
    private _cachingService: CachingService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.enrollForm = this._fb.group({
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
    // user information uses for auto fill infor when checking out\
    const userList = this._cachingService.localStorage.get('UserList') || [];
    this._cachingService.localStorage.store('UserList', [...userList, value]);
    this.close();
    this._snackBar.open('Registrion successfully', 'Ok', {
      duration: 5000
    });
  }

  close() {
    this.dialogRef.close();
  }

}
