import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'form-task',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.scss',
})
export class FormTaskComponent implements OnInit {
  @Output()
  newTaskAdded = new EventEmitter(true);
  newTaskForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.newTaskForm = this.fb.group({
      taskName: ['', [Validators.required]],
    });
  }

  addNewTask() {
    if (this.newTaskForm.valid) {
      this.taskService
        .addTask({ title: this.newTaskForm.value.taskName })
        .subscribe({
          next: (result) => {
            this.newTaskAdded.emit(result);
            this.newTaskForm.reset();
            this.snackBar.open('Nouvelle liste de tâche crée', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          },
          error: (error) => {
            console.error(error);
            const errorMessage =
              error?.error?.message ||
              'Une erreur est survenue lors de la création de la liste de tache.';
            this.snackBar.open(errorMessage, 'Fermer', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          },
        });
    }
  }
}
