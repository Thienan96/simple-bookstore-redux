import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocicalLoginPageComponent } from './socical-login-page.component';

describe('SocicalLoginPageComponent', () => {
  let component: SocicalLoginPageComponent;
  let fixture: ComponentFixture<SocicalLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocicalLoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocicalLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
