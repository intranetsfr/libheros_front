import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../../models/Task';

@Component({
  selector: 'form-subtask',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormField,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './form-subtask.component.html',
  styleUrl: './form-subtask.component.scss',
})
export class FormSubtaskComponent {
  @Input()
  task!: Task;
  @Output()
  newSubTaskAdded = new EventEmitter(true);
  newSubTaskForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.newSubTaskForm = this.fb.group({
      short_description: ['', [Validators.required]],
      long_description: [''],
      date_end: ['', [Validators.required]],
    });
  }
  submitSubTask() {
    if (this.newSubTaskForm.valid) {
      this.taskService.addSubtask(this.task.id, this.newSubTaskForm.value);
      this.taskService
        .addSubtask(this.task.id, this.newSubTaskForm.value)
        .subscribe({
          next: (result) => {
            console.log(result);
            this.newSubTaskAdded.emit(result);
            this.newSubTaskForm.reset();
            this.snackBar.open('Task added successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          },
          error: (error) => {
            console.error(error);
            const errorMessage =
              error?.error?.message ||
              'An error occurred while adding the task.';
            this.snackBar.open(errorMessage, 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          },
        });
    }
  }
}
