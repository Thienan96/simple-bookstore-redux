import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocicalLoginPageComponent } from './socical-login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../state/auth/auth.effects';
import { CachingService } from '../shared/caching.service';
import { EnrollFormModule } from '../enroll-form/enroll-form.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginModule } from '../login/login.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    SocicalLoginPageComponent
  ],
  imports: [
    CommonModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexLayoutModule,
    EffectsModule.forFeature([AuthEffects]),
    EnrollFormModule,
    LoginModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [
    CachingService,
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '188315691072-to99oc7b56e5l1qpdvq7o0s2b4195aiv.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
})
export class SocicalLoginPageModule { }
