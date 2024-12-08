import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../models/Task';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormSubtaskComponent } from '../form-subtask/form-subtask.component';
import { TaskService } from '../../services/task.service';
import { Subtask } from '../../models/Subtask';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { SubtaskItemComponent } from '../subtask-item/subtask-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'detail-task',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    FormSubtaskComponent,
    MatListModule,
    SubtaskItemComponent,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnChanges {
  @Input()
  task!: Task;
  subTaskListPending!: Subtask[];
  subTaskListComplete!: Subtask[];
  selectedSubTask: Subtask | null = null;
  constructor(private taskService: TaskService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && changes['task'].currentValue) {
      this.getSubTask(this.task.id);
      this.selectedSubTask = null;
    }
  }
  getSubTask(taskId: number) {
    this.taskService.getSubtask(taskId).subscribe((result) => {
      this.subTaskListPending = result.filter(
        (subtask: Subtask) => subtask.status === 'pending'
      );
      this.subTaskListComplete = result.filter(
        (subtask: Subtask) => subtask.status === 'complete'
      );
    });
  }
  withDetail() {
    if (this.selectedSubTask) {
      return 'withRightSidebar';
    } else {
      return '';
    }
  }
  showDetailSubtask(subtask: Subtask) {
    this.selectedSubTask = subtask;
  }
  deleteSubtask(subtask: Subtask) {}
}
