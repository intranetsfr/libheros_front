import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormTaskComponent } from "../../tasks/form-task/form-task.component";
import { SearchTaskComponent } from "../../tasks/search-task/search-task.component";
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { DetailComponent } from "../../tasks/detail/detail.component";
import { CommonModule } from '@angular/common';

export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FormTaskComponent,
    SearchTaskComponent,
    DetailComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  
  taskForm!: FormGroup;
  taskLists!:Task[];
  constructor(private fb: FormBuilder, private taskService:TaskService) {
  }
  ngOnInit(): void {
    this.getAllTasks();
  }
  getAllTasks(){

    this.taskService.getTasks().subscribe(tasks=>{
      this.taskLists = tasks;
    })
  }
  
  filterTasks(filteredList: Task[]): void {
    this.taskLists = filteredList;
  }
  selectedList: { id: number; name: string } | null = null;
  newTask = { shortDescription: '', longDescription: '', dueDate: '' };
  completedTasks: any[] = [];
  showCompletedTasks = false;

  selectedTask!:Task;
  
  // Afficher les détails d'une tâche
  selectTask(task: Task) {
    this.selectedTask = task;
  }
}
