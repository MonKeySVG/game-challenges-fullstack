import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthComponent} from "./components/auth/auth.component";
import {GamesComponent} from "./components/games/games.component";
import { ChallengesComponent} from "./components/challenges/challenges.component";
import { SubmissionsComponent} from "./components/submissions/submissions.component";
import {NavbarComponent} from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthComponent, GamesComponent, ChallengesComponent, SubmissionsComponent, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
