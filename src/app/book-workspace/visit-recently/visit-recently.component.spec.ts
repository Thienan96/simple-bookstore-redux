import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitRecentlyComponent } from './visit-recently.component';

describe('VisitRecentlyComponent', () => {
  let component: VisitRecentlyComponent;
  let fixture: ComponentFixture<VisitRecentlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitRecentlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitRecentlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
