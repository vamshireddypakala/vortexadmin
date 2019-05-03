import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquesubcatComponent } from './addquesubcat.component';

describe('AddquesubcatComponent', () => {
  let component: AddquesubcatComponent;
  let fixture: ComponentFixture<AddquesubcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddquesubcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddquesubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
