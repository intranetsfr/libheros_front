import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-subscribe',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss',
})
export class SubscribeComponent implements OnInit {
  authForm!: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authForm = this.fb.nonNullable.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }
  passwordMatchValidator = (
    controlName: string,
    matchingControlName: string
  ): ValidatorFn => {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      if (
        matchingControl.errors &&
        !matchingControl.errors['passwordMismatch']
      ) {
        return null;
      }

      console.log(control.value, matchingControl.value);
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  };
  loginWithEmail() {
    if (this.authForm.valid) {
      this.loading = true;
      const { firstname, lastname, email, password } = this.authForm.value;

      this.authService
        .subscribe(firstname, lastname, email, password)
        .subscribe((result) => {
          if (result.accessToken) {
            this.authService.saveToken(result.accessToken);
            this.loading = false;

            this.router.navigate(['/']);
          }
        });
    }
  }
}
