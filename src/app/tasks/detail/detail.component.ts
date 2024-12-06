import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../models/Task';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormSubtaskComponent } from "../form-subtask/form-subtask.component";

@Component({
  selector: 'detail-task',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, FormSubtaskComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  @Input()
  task!: Task;
}
