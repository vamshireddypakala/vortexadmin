import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubsectionComponent } from './addsubsection.component';

describe('AddsubsectionComponent', () => {
  let component: AddsubsectionComponent;
  let fixture: ComponentFixture<AddsubsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsubsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsubsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
