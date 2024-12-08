import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private utilsService:UtilsService) {}
  
  getTasks(): Observable<any> {
    const headers = this.utilsService.getHeader();
    return this.http.get<any>(`${this.utilsService.getDefaultApiUrl()}/task/get`, { headers });
  }

  searchTasks(taskToFind:string): Observable<any> {
    const headers = this.utilsService.getHeader();
    return this.http.get<any>(`${this.utilsService.getDefaultApiUrl()}/task/search?title=${taskToFind}`, { headers });
  }

  addTask(task: any): Observable<any> {
    const headers = this.utilsService.getHeader();
    return this.http.post<any>(`${this.utilsService.getDefaultApiUrl()}/task/addTask`, task, { headers });
  }
  addSubtask(taskId:number, subtask: any): Observable<any> {
    const headers = this.utilsService.getHeader();
    return this.http.post<any>(`${this.utilsService.getDefaultApiUrl()}/task/addSubTask?taskId=${taskId}`, subtask, { headers });
  }
  getSubtask(taskId:number): Observable<any> {
    const headers = this.utilsService.getHeader();
    return this.http.get<any>(`${this.utilsService.getDefaultApiUrl()}/task/getSubTask?taskId=${taskId}`, { headers });
  }
  
  updateTask(taskId: string, updates: any): Observable<any> {
    const headers = this.utilsService.getHeader();
    return this.http.put<any>(`${this.utilsService.getDefaultApiUrl()}/task/${taskId}`, updates, { headers });
  }
  deleteTask(taskId: string): Observable<any> {
    const headers = this.utilsService.getHeader();
    return this.http.delete<any>(`${this.utilsService.getDefaultApiUrl()}/task/${taskId}`, { headers });
  }
}
