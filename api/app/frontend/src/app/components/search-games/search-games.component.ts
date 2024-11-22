import { Component } from '@angular/core';
import { ApiService} from "../../services/api.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-search-games',
  standalone: true,
  templateUrl: './search-games.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./search-games.component.css']
})
export class SearchGamesComponent {
  query: string = '';
  results: any[] = [];
  selectedGame: any = null;
  isDropdownVisible: boolean = false;

  constructor(private apiService: ApiService) {}

  onSearch(): void {
    if (this.query.length > 2) {
      this.apiService.searchGames(this.query).subscribe({
        next: (data) => {
          this.results = data.results; // RAWG renvoie une liste de résultats sous 'results'
        },
        error: (err) => console.error('Error fetching games:', err)
      });
    }
  }

  selectGame(game: any): void {
  this.apiService.getGameDetails(game.id).subscribe({
    next: (details) => {
      this.selectedGame = {
        title: details.name, // Nom du jeu
        description: details.description, // Description détaillée
        background_image: details.background_image, // Image de fond
      };
      console.log('Selected Game Details:', this.selectedGame);
      this.results = []; // Efface les résultats de recherche
    },
    error: (err) => console.error('Error fetching game details:', err)
  });
}

  addGameToDatabase(): void {
    if (this.selectedGame) {
      const { title, description, background_image } = this.selectedGame;
      console.log('Selected game:', this.selectedGame);
      this.apiService.addGame(title, description, background_image).subscribe({
        next: () => {
          console.log('Game added successfully!');
          this.selectedGame = null; // Réinitialise la sélection
          this.query = ''; // Réinitialise le champ de recherche
          window.location.reload();
        },
        error: (err) => console.error('Error adding game to database:', err)
      });
    }
  }



  onFocus(): void {
    this.isDropdownVisible = true;
  }

  onBlur(): void {
    setTimeout(() => {
      this.isDropdownVisible = false;
    }, 200); // Delay to allow click event to register
  }

}
