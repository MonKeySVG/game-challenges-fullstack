import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Nécessaire pour les directives Angular de base (ngIf, ngFor, etc.)
import { FormsModule } from '@angular/forms';
import {ApiService} from "../../services/api.service"; // Nécessaire pour [(ngModel)]

@Component({
  selector: 'app-auth',
  standalone: true, // Indique que ce composant est standalone
  imports: [CommonModule, FormsModule], // Importez les modules nécessaires
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  username = '';
  password = '';
  loginUsername = '';
  loginPassword = '';

  constructor(private apiService: ApiService, private router: Router) {}

  register() {
    this.apiService.registerUser(this.username, this.password).subscribe(
      response => {
        console.log('User registered:', response);
      },
      error => {
        console.error('Registration error:', error);
      }
    );
  }

  login() {
    this.apiService.login(this.loginUsername, this.loginPassword).subscribe(
      response => {
        console.log('Login successful, token:', response.access_token);
        localStorage.setItem('token', response.access_token); // Stocker le token
        this.router.navigate(['/games']); // Rediriger vers GamesComponent
      },
      error => {
        console.error('Login error:', error);
      }
    );
  }
}
