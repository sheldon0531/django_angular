import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { TriviaComponent } from './trivia/trivia.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, HttpClientModule, FormsModule, MatRadioModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'djangular-trivia-web';
}
