import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardinfoComponent } from './user-cardinfo.component';

describe('UserCardinfoComponent', () => {
  let component: UserCardinfoComponent;
  let fixture: ComponentFixture<UserCardinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCardinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
