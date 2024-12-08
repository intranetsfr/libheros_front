import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subtask } from '../../models/Subtask';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {  MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

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
  subTaskDetailEvent = new EventEmitter(false);
  constructor(){

  }
  setSubtaskStatus(subTask:Subtask){
    
  }
  showDetailSubtask(subTask:Subtask){
    this.subTaskDetailEvent.emit(subTask)
  }
}
