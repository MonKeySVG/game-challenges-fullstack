import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import {GamesComponent} from "./components/games/games.component";
import {ChallengesComponent} from "./components/challenges/challenges.component";
import {SubmissionsComponent} from "./components/submissions/submissions.component";
import {AuthGuard} from "./guards/auth.guard";


export const routes: Routes = [
  { path: '', component: AuthComponent }, // Page d'accueil : connexion
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard] }, // Page des jeux
  { path: 'games/:gameId/challenges', component: ChallengesComponent, canActivate: [AuthGuard] },
  { path: 'games/:gameId/challenges/:challengeId/submissions', component: SubmissionsComponent, canActivate: [AuthGuard] }

];
