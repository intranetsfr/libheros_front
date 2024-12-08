import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subtask } from '../../models/Subtask';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {  MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'subtask-item',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './subtask-item.component.html',
  styleUrl: './subtask-item.component.scss'
})
export class SubtaskItemComponent {
  @Input()
  subTask!:Subtask;
  @Output()
  subTaskDetailEvent = new EventEmitter();
  @Output()
  subTaskUpdated = new EventEmitter();
  constructor(private taskService:TaskService,
    private snackBar: MatSnackBar){
  }
  setSubtaskStatus(subTask:Subtask){
    let newStatus = subTask.status == "pending" ? "complete":"pending";
    this.taskService.setSubtaskStatus(newStatus, subTask.id).subscribe({
      next: (result) => {
        this.subTaskUpdated.emit(result);
        this.snackBar.open('La tâche a été mise à jour', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        console.error(error);
        const errorMessage =
          error?.error?.message ||
          'Une erreur est survenue lors de la mise à jour de la tâche.';
        this.snackBar.open(errorMessage, 'Fermer', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }
  showDetailSubtask(subTask:Subtask){
    this.subTaskDetailEvent.emit(subTask)
  }
}
