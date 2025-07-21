import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../service/login/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css']  // corregido: styleUrl → styleUrls (y es un array)
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.login(); // ejecuta la función login al enviar
  }

  login(): void {
    const { username, password } = this.loginForm.value;

    this.loginService.login(username, password).subscribe({
      next: (response) => {
        const { token } = response;

        // Guardar solo el token
        document.cookie = `token=${token}; path=/`;

        // Redirigir a la vista principal
        this.router.navigate(['/start']); // O donde tengas tu dashboard
      },
      error: (err) => {
        console.error('Login fallido:', err);
      }
    });
  }

}
