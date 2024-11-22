import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Importer la configuration

// Utiliser la configuration globale
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
