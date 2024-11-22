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

  message = ''; // Message à afficher
  messageType: 'success' | 'error' | '' = ''; // Type de message ('success', 'error', '')

  constructor(private apiService: ApiService, private router: Router) {}

  register() {
    this.message = ''; // Réinitialiser le message
    this.apiService.registerUser(this.username, this.password).subscribe(
      response => {
        this.messageType = 'success';
        this.message = 'Compte créé avec succès !';
      },
      error => {
        this.messageType = 'error';
        if (error.status === 409) { // Conflit - nom d'utilisateur existant
          this.message = 'Nom d’utilisateur déjà existant.';
        } else {
          this.message = 'Erreur lors de la création du compte.';
        }
      }
    );
  }

  login() {
    this.message = ''; // Réinitialiser le message
    this.apiService.login(this.loginUsername, this.loginPassword).subscribe(
      response => {
        this.messageType = 'success';
        this.message = 'Connexion réussie !';
        localStorage.setItem('token', response.access_token); // Stocker le token
        this.router.navigate(['/games']); // Rediriger vers GamesComponent
      },
      error => {
        this.messageType = 'error';
        if (error.status === 401) { // Non autorisé - identifiants incorrects
          this.message = 'Identifiant ou mot de passe incorrect.';
        } else {
          this.message = 'Erreur lors de la connexion.';
        }
      }
    );
  }
}
