import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private utilsService:UtilsService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.utilsService.getDefaultApiUrl()}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('authToken', response.token);
        })
      );
  }
  subscribe(firstname:string, lastname:string, email:string, password:string){
    let dataUser = {
      firstname:firstname,
      lastname:lastname,
      email:email,
      password:password
    };
    return this.http.post<any>(`${this.utilsService.getDefaultApiUrl()}/auth/subscribe`,dataUser);

  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('authToken');
  }
  saveToken(token:string): void {
    localStorage.setItem('authToken', token);
  }
}
