import {FlexLayoutModule} from '@angular/flex-layout';
import { Component, OnInit, trigger, state, style, transition, animate, HostListener } from '@angular/core';
import AppConfig from '../app.config';
import { GameService } from './../shared/game.service';

const ANIMATION_DURATION_MS = 500;

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
      transition('active => inactive', animate(`${ANIMATION_DURATION_MS}ms ease-out`)),
      transition('inactive => active', animate(`${ANIMATION_DURATION_MS}ms ease-in`))
    ]),
    trigger('shrinkState', [
      state('active', style({
        transform: 'scale(0)'
      })),
      state('inactive',   style({
        transform: 'scale(1)'
      })),
      transition('inactive => active', animate(`${ANIMATION_DURATION_MS}ms ease-in`)),
      transition('active => inactive', animate(`${ANIMATION_DURATION_MS}ms ease-out`))
    ])  
  ]
})
export class GameComponent {
  private cardSize: number;
  private cards = [];
  private flippedCard1: any;
  private flippedCard2: any;
  private placeholderDuration = 5000;

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

    this.cards.forEach((card) => {
      card.flip = 'inactive';
    });
  }

  startGame() {
    this.cards.forEach((card) => card.flip = 'active');
    this.startTimer();
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
      const isSuccess = this.flippedCard1.class === this.flippedCard2.class;
      const animateField = isSuccess ? 'shrink' : 'flip';

      this.flippedCard1[animateField] = this.flippedCard2[animateField] = 'active';
      
      this.flippedCard1 = this.flippedCard2 = null;

      setTimeout(() => { // wait for flip or shrink aniamtion to complete
        resolve(isSuccess);
      }, ANIMATION_DURATION_MS);
    })
    .then((isSuccess) => {
      if(isSuccess) {
        this.points += 10;

        const visibleCardsCount = this.cards.reduce((partialSum, card) => {
          return card.shrink === 'inactive' ? partialSum + 1 : partialSum;
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

      setTimeout(() => { //wait for flip aniamtion to complete
        this.processFlippedCards();
      }, ANIMATION_DURATION_MS);
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
    return true;
  }
 }