import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from "@angular/forms";
import { DatePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-submissions',
  standalone: true,
  templateUrl: './submissions.component.html',
  imports: [
    FormsModule,
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {
  submissions: any[] = [];
  newSubmission = { title: '', description: '', video_link: '' };
  challengeId!: number;
  gameId!: number;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupération des paramètres depuis l'URL
    this.gameId = +this.route.snapshot.paramMap.get('gameId')!;
    this.challengeId = +this.route.snapshot.paramMap.get('challengeId')!;
    console.log(`gameId: ${this.gameId}, challengeId: ${this.challengeId}`);

    this.loadSubmissions();
  }

  /**
   * Charge les soumissions associées au challenge actuel
   */
  loadSubmissions(): void {
    this.apiService.getSubmissions(this.gameId, this.challengeId).subscribe({
      next: (data) => {
        this.submissions = data;
        console.log('Loaded submissions:', data);
      },
      error: (err) => {
        console.error('Error loading submissions:', err);
      }
    });
  }

  /**
   * Ajoute une nouvelle soumission
   */
  addSubmission(): void {
    if (this.newSubmission.title && this.newSubmission.video_link) {
      this.apiService.addSubmission(this.gameId, this.challengeId, this.newSubmission).subscribe({
        next: (data) => {
          // Ajouter la nouvelle soumission à la liste et réinitialiser le formulaire
          this.submissions.push(data);
          this.newSubmission = { title: '', description: '', video_link: '' };
          console.log('Submission added:', data);
        },
        error: (err) => {
          console.error('Error adding submission:', err);
        }
      });
    } else {
      console.warn('Title and video link are required for a new submission.');
    }
  }
}
