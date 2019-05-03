import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhomesectionComponent } from './addhomesection.component';

describe('AddhomesectionComponent', () => {
  let component: AddhomesectionComponent;
  let fixture: ComponentFixture<AddhomesectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddhomesectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddhomesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
