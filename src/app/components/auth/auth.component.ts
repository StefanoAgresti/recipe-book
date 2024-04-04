import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  error!: Error;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  authForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (!this.authForm.valid) return;

    let authResData;
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    if (this.isLoginMode) {
      authResData = this.authService.signIn(email, password);
    } else {
      authResData = this.authService.signUp(email, password);
    }

    authResData
      .then((user) => {
        if (user) {
          this.authForm.reset();
          this.router.navigate(['/recipes']);
        } else {
          this.router.navigate(['']);
        }
      })
      .catch((err) => (this.error = err));
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
