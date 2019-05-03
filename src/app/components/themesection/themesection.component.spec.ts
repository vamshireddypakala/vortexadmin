import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesectionComponent } from './themesection.component';

describe('ThemesectionComponent', () => {
  let component: ThemesectionComponent;
  let fixture: ComponentFixture<ThemesectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemesectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
