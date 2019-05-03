import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddthemesectionComponent } from './addthemesection.component';

describe('AddthemesectionComponent', () => {
  let component: AddthemesectionComponent;
  let fixture: ComponentFixture<AddthemesectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddthemesectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddthemesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
