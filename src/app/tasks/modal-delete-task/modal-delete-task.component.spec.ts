import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteTaskComponent } from './modal-delete-task.component';

describe('ModalDeleteTaskComponent', () => {
  let component: ModalDeleteTaskComponent;
  let fixture: ComponentFixture<ModalDeleteTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
