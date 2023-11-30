import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TriviaService } from "../trivia.service";
import { Question, QuestionArray, Answer } from "../trivia";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioChange } from "@angular/material/radio";

@Component({
  selector: 'app-trivia',
  standalone: true,
  providers: [TriviaService,],
  imports: [CommonModule, FormsModule, MatRadioModule, MatButtonModule,],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css'
})
export class TriviaComponent implements OnInit {
  constructor(private triviaService: TriviaService) { }
  triviaData: QuestionArray = [];
  question: Question|null = null;
  answer: Answer|null = null;
  disableRadioButtons: boolean = false;
  disableNextButton: boolean = true;
  questionNumber: number = 0;
  correctAnswers: number = 0;

  ngOnInit(): void {
    this.getTrivia();
  }

  getTrivia() {
    this.triviaService.getTrivia().subscribe({
        next: (data) => {
          this.triviaData = data;
          this.getNextQuestion();
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  getNextQuestion() {
    if (this.triviaData.length) {
      const index = Math.floor(Math.random() * this.triviaData.length);
      this.question = this.triviaData[index];
      this.triviaData.splice(index, 1);
    } else {
      this.question = null;
    }

    if (this.answer) {
      this.questionNumber++;
      if (this.answer.is_correct) {
        this.correctAnswers++;
      }
    }

    this.answer = null;
    this.disableRadioButtons = false;
    this.disableNextButton = true;
  }

  getCorrectAnswer() {
    if (this.question) {
      return this.question.answers.filter(answer => answer.is_correct)[0].answer;
    }
    return '';
  }

  answerSelected(event: MatRadioChange) {
    this.disableRadioButtons = true;
    this.disableNextButton = false;
  }
}
