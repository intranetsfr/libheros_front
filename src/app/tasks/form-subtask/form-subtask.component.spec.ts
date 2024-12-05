import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubtaskComponent } from './form-subtask.component';

describe('FormSubtaskComponent', () => {
  let component: FormSubtaskComponent;
  let fixture: ComponentFixture<FormSubtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubtaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
