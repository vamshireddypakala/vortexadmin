import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsubcatComponent } from './questionsubcat.component';

describe('QuestionsubcatComponent', () => {
  let component: QuestionsubcatComponent;
  let fixture: ComponentFixture<QuestionsubcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsubcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
