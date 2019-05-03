import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestioncatComponent } from './questioncat.component';

describe('QuestioncatComponent', () => {
  let component: QuestioncatComponent;
  let fixture: ComponentFixture<QuestioncatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestioncatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestioncatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
