import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import {RouterLink} from "@angular/router";
import {SearchGamesComponent} from "../search-games/search-games.component";

@Component({
  selector: 'app-games',
  standalone: true,
  templateUrl: './games.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    RouterLink,
    SearchGamesComponent
  ],
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: any[] = [];
  newGame = { title: '', description: '', background_image: '' };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.apiService.getGames().subscribe({
      next: (data) => {
        this.games = data;
      },
      error: (err) => console.error('Error loading games:', err)
    });
  }

  addGame(): void {
    if (this.newGame.title && this.newGame.description && this.newGame.background_image) {
      this.apiService.addGame(this.newGame.title, this.newGame.description, this.newGame.background_image).subscribe({
        next: (data) => {
          this.games.push(data);
          this.newGame = { title: '', description: '', background_image: '' }; // Reset fields
        },
        error: (err) => console.error('Error adding game:', err)
      });
    } else {
      console.error('Please fill in all fields before adding a game');
    }
  }
}
