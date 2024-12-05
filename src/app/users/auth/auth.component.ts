import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-auth',
  imports: [
    RouterModule,
    ReactiveFormsModule,MatCardModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  loading = false;
  constructor(private fb:FormBuilder){
    
  }
  ngOnInit(): void {
    // Initialiser la Reactive Form
    this.authForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginWithEmail() {
    if (this.authForm.valid) {
      this.loading = true;
      const { email, password } = this.authForm.value;
      /*
      this.authService.loginWithEmail(email, password).finally(() => {
        this.loading = false;
      });
      */
    }
  }
}
