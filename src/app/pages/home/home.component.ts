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

export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-home',
  imports: [
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
    FormTaskComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  
  taskForm!: FormGroup;
  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {

  }
  taskLists: { id: number; name: string }[] = [];
  selectedList: { id: number; name: string } | null = null;

  // Tâches
  tasks: {
    id: number;
    shortDescription: string;
    longDescription?: string;
    dueDate: string;
    creationDate: string;
    completed: boolean;
  }[] = [];
  newTask = { shortDescription: '', longDescription: '', dueDate: '' };
  completedTasks: any[] = [];
  showCompletedTasks = false;

  // Tâche sélectionnée (Right Sidebar)
  selectedTask: any = null;

  // Gestion des listes
  openNewListModal() {
    const listName = prompt('Nom de la nouvelle liste :');
    if (listName) {
      const isDuplicate = this.taskLists.some((list) => list.name === listName);
      if (isDuplicate) {
        alert('Une liste avec ce nom existe déjà.');
      } else {
        const newList = { id: Date.now(), name: listName };
        this.taskLists.push(newList);
      }
    }
  }

  selectList(list: any) {

    this.taskForm = this.fb.nonNullable.group(
      {
        short_description: ['', [Validators.required]],
        long_description: [''],
        date: ['', [Validators.required]],
      }
    );
    this.selectedList = list;
    this.tasks = [];
    this.completedTasks = [];
  }

  confirmDeleteList(list: any, event: Event) {
    event.stopPropagation();
    const confirmed = confirm(
      `Supprimer la liste "${list.name}" ? Toutes les tâches associées seront également supprimées.`
    );
    if (confirmed) {
      this.taskLists = this.taskLists.filter((l) => l.id !== list.id);
      if (this.selectedList?.id === list.id) {
        this.selectedList = null;
        this.tasks = [];
      }
    }
  }

  // Gestion des tâches
  addTask() {
    if (!this.newTask.shortDescription || !this.newTask.dueDate) {
      alert(
        'Les champs Description courte et Date d’échéance sont obligatoires.'
      );
      return;
    }
    const newTask = {
      id: Date.now(),
      shortDescription: this.newTask.shortDescription,
      longDescription: this.newTask.longDescription,
      dueDate: this.newTask.dueDate,
      creationDate: new Date().toISOString(),
      completed: false,
    };
    this.tasks.push(newTask);
    this.newTask = { shortDescription: '', longDescription: '', dueDate: '' };
  }

  toggleTaskCompletion(task: any) {
    task.completed = !task.completed;
    if (task.completed) {
      this.completedTasks.push(task);
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    } else {
      this.tasks.push(task);
      this.completedTasks = this.completedTasks.filter((t) => t.id !== task.id);
    }
  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
  }

  confirmDeleteTask(task: any) {
    const confirmed = confirm(
      'Êtes-vous sûr de vouloir supprimer cette tâche ?'
    );
    if (confirmed) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      this.completedTasks = this.completedTasks.filter((t) => t.id !== task.id);
      this.selectedTask = null;
    }
  }

  // Afficher les détails d'une tâche
  selectTask(task: any) {
    this.selectedTask = task;
  }
}
