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
    return this.http.get<any>(`${this.utilsService.getDefaultApiUrl()}/tasks`, { headers });
  }

  addTask(task: any): Observable<any> {
    const headers = this.utilsService.getHeader();
    return this.http.post<any>(`${this.utilsService.getDefaultApiUrl()}/tasks`, task, { headers });
  }
  
  updateTask(taskId: string, updates: any): Observable<any> {
    const headers = this.utilsService.getHeader();
    return this.http.put<any>(`${this.utilsService.getDefaultApiUrl()}/tasks/${taskId}`, updates, { headers });
  }
  deleteTask(taskId: string): Observable<any> {
    const headers = this.utilsService.getHeader();
    return this.http.delete<any>(`${this.utilsService.getDefaultApiUrl()}/tasks/${taskId}`, { headers });
  }
}
