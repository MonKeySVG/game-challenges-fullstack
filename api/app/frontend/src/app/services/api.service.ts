import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const rawgApiKey = '484254e367ac4687b304731ab294a134'; // Remplacez par votre clé API

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000'; // URL de l'API FastAPI

  constructor(private http: HttpClient) {}



  // Récupère le token JWT depuis localStorage et construit les en-têtes d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated'); // Gère le cas où le token est absent
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Enregistrement d'un utilisateur
  registerUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  // Connexion et récupération du token JWT
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  // Exemple d'accès à un endpoint sécurisé
  getProtectedResource(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/protected`, { headers });
  }

  // Récupérer la liste des jeux
  getGames(): Observable<any> {
    return this.http.get(`${this.baseUrl}/games`);
  }

  // Ajouter un nouveau jeu
  addGame(title: string, description: string, background_image: string): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
  return this.http.post(`${this.baseUrl}/games`, { title, description, background_image }, { headers });
}

  searchGames(query: string): Observable<any> {
    const url = `https://api.rawg.io/api/games?search=${query}&key=${rawgApiKey}`;
    return this.http.get(url);
  }

  getGameDetails(gameId: number): Observable<any> {
    const externalApiUrl = `https://api.rawg.io/api/games/${gameId}?key=${rawgApiKey}`;
    return this.http.get(externalApiUrl);
  }

  getGameById(gameId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/games/${gameId}`);
  }


  // Récupérer la liste des challenges pour un jeu donné
  getChallenges(gameId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/games/${gameId}/challenges`);
  }

  // Ajouter un nouveau challenge à un jeu
  addChallenge(gameId: number, challenge: { title: string; description: string }): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/games/${gameId}/challenges`, challenge, { headers });
  }

  // Récupérer les soumissions pour un challenge donné
  getSubmissions(gameId: number, challengeId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/games/${gameId}/challenges/${challengeId}/submissions`, { headers });
  }

  // Ajouter une soumission pour un challenge
  addSubmission(gameId: number, challengeId: number, submission: { title: string; description: string; video_link: string }): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/games/${gameId}/challenges/${challengeId}/submissions`, submission, { headers });
  }
}
