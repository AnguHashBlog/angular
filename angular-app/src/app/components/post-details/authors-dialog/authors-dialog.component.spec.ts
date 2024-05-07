import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsDialogComponent } from './authors-dialog.component';

describe('PostAuthorsListDialogComponent', () => {
  let component: AuthorsDialogComponent;
  let fixture: ComponentFixture<AuthorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
