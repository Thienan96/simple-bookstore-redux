import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookWorkspaceComponent } from './book-workspace.component';

describe('BookWorksapceComponent', () => {
  let component: BookWorkspaceComponent;
  let fixture: ComponentFixture<BookWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
