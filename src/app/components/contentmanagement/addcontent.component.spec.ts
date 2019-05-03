import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontentComponent } from './addcontent.component';

describe('AddcontentComponent', () => {
  let component: AddcontentComponent;
  let fixture: ComponentFixture<AddcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
