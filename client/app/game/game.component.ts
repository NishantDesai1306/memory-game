import {MatCardModule, MdIconButtonCssMatStyler} from '@angular/material';
import { Component, OnInit, trigger, state, style, transition, animate, HostListener } from '@angular/core';
import AppConfig from '../app.config';

import { GameService } from './../shared/game.service';

@Component({
  templateUrl: './game.component.html',
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),    
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])  
  ]
})
export class GameComponent {
  private cardSize: number;
  private cards = [];
  private flippedCard1: any;
  private flippedCard2: any;

  private isGameCompleted: boolean;
  private points: number;

  private timer: number;
  private timerHandle: any;

  private AppConfig: any = AppConfig;

  constructor(private gameService: GameService) {}
  
  resetGameData() {
    this.cards = this.gameService.getCards();

    this.isGameCompleted = false;
    this.points = 0;
    this.timer = AppConfig.TIME_TO_PLAY;

    this.cards.forEach((card) => card.flip = 'inactive');

    setTimeout(() => {
      this.cards.forEach((card) => card.flip = 'active');
      this.startTimer();
    }, 3000);
  }

  startTimer() {
    this.timerHandle = setInterval(() => {
      this.timer--;

      if(this.timer === 0) {
        this.stopTimer();
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timerHandle);
    this.timerHandle = null;
  }

  ngOnInit() {
    const totalCards = this.gameService.getTotalCards();
    const cardsPerRow = this.gameService.getCardsPerRow();

    this.cardSize = (100 * cardsPerRow) / totalCards;
    
    this.resetGameData();
  }

  processFlippedCards() {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = this.flippedCard1.class === this.flippedCard2.class;
        this.flippedCard1.flip = this.flippedCard2.flip = 'active';

        if(isSuccess) {
          this.flippedCard1.isVisible = this.flippedCard2.isVisible = false;
        }

        this.flippedCard1 = this.flippedCard2 = null;

        resolve(isSuccess);
      }, 600);
    })
    .then((isSuccess) => {
      if(isSuccess) {
        this.points += 10;

        const visibleCardsCount = this.cards.reduce((partialSum, card) => {
          return card.isVisible ? partialSum + 1 : partialSum;
        }, 0);

        // there's no point is firceing user to click last two remaining cards
        this.isGameCompleted = visibleCardsCount === 2;

        if(this.isGameCompleted) {
          this.stopTimer();
          this.points += this.timer;
        }
      }
    });
  }

  toggleFlip(card) {
    if(this.timer === AppConfig.TIME_TO_PLAY) { //if user clicks while preview is being displayed
      return;
    }

    if(this.flippedCard1) {
      if(this.flippedCard1.id === card.id) { // same card is clicked twice
        return;
      }

      this.flippedCard2 = card;
      this.processFlippedCards();
    }
    else {
      this.flippedCard1 = card;
    }

    card.flip = card.flip === 'inactive' ? 'active' : 'inactive';
  }

  playAgain() {
    this.resetGameData();
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean { // can deactivate only if result screen is being displayed
    return !this.timer || this.isGameCompleted;
  }
 }