import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquecatComponent } from './addquecat.component';

describe('AddquecatComponent', () => {
  let component: AddquecatComponent;
  let fixture: ComponentFixture<AddquecatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddquecatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddquecatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
