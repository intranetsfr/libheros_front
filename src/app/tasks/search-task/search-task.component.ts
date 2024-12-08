import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'search-task',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './search-task.component.html',
  styleUrl: './search-task.component.scss',
})
export class SearchTaskComponent {
  @Output()
  listTask = new EventEmitter(true);
  searchTaskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}
  ngOnInit(): void {
    this.searchTaskForm = this.fb.group({
      taskName: ['', [Validators.required]],
    });
  }
  searchList() {
    let taskName = this.searchTaskForm.controls['taskName'].value;

    this.taskService.searchTasks(taskName).subscribe((result) => {
      this.listTask.emit(result);
    });
  }
}
