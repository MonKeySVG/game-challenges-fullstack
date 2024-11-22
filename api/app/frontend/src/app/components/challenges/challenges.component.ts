import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { ApiService } from '../../services/api.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Ajouter CommonModule ici
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
})
export class ChallengesComponent implements OnInit {
  challenges: any[] = [];
  newChallenge = { title: '', description: '' };
  gameId!: number;
  gameTitle: string = '';
  gameBackgroundImage: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.gameId = +this.route.snapshot.paramMap.get('gameId')!;

    // Chargement des détails du jeu pour obtenir l'image de fond
    this.apiService.getGameById(this.gameId).subscribe(
      (data: any) => {
        // Assurez-vous que le backend retourne les informations du jeu correctement
        this.gameBackgroundImage = data.background_image;
        this.gameTitle = data.title;
        console.log('Game Background Image:', this.gameBackgroundImage);
        console.log('Game Details:', data);
      },
      (error) => console.error('Error loading game details:', error)
    );


    this.loadChallenges();
  }

  loadChallenges(): void {
    this.apiService.getChallenges(this.gameId).subscribe(
      (data) => (this.challenges = data),
      (error) => console.error('Error loading challenges:', error)
    );
  }

  addChallenge(): void {
    if (this.newChallenge.title) {
      this.apiService.addChallenge(this.gameId, this.newChallenge).subscribe(
        (data) => {
          this.challenges.push(data);
          this.newChallenge = { title: '', description: '' };
        },
        (error) => console.error('Error adding challenge:', error)
      );
    }
  }
}
