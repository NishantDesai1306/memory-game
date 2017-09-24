import { Injectable } from '@angular/core';
import AppConfig from '../app.config';

interface Card {
    id: number,
    class: string,
    flip: string,
    shrink: string
};

@Injectable()
export class GameService {
    private totalCards = AppConfig.TOTAL_CARDS;
    private cardsPerRow = AppConfig.CARDS_PER_ROW; 

    constructor() {}

    generateCards(count): Card[] {
        const cards = [];
        const colorClasses = ['red-card', 'yellow-card', 'green-card', 'blue-card'];
        const emptyCards = [];
        const getRandomCard = () => {
            const randomCard1Index = Math.floor(Math.random() * emptyCards.length) + 0
            const card1Id = emptyCards[randomCard1Index];
            
            emptyCards.splice(randomCard1Index, 1);
            
            return card1Id;
        }

        for(let i=0 ; i<count ; i++) {
            emptyCards.push(i);
        }

        while(emptyCards.length) {
            const randomColor = Math.floor(Math.random() * colorClasses.length) + 0;

            const card1Id = getRandomCard();
            const card2Id = getRandomCard();

            const card1: Card = {
                id: card1Id,
                class: colorClasses[randomColor],
                flip: 'active',
                shrink: 'inactive'
            }
            const card2: Card = {
                id: card2Id,
                class: colorClasses[randomColor],
                flip: 'active',
                shrink: 'inactive'
            }
    
            cards[card1Id] = card1;
            cards[card2Id] = card2;
        }

        return cards;
    }

    setTotalCards(count: number) : void  {
        if(!count || !(count%2)) {
            return console.error('Total cards should be non-zero even number but found', count);
        }
        
        this.totalCards = count;
    }
    getTotalCards() : number {
        return this.totalCards;
    }

    setCardsPerRow(cardsPerRow: number): void {
        if(!this.totalCards || !(this.totalCards%cardsPerRow)) {
            return console.error(`to form a grid the totalCards(${this.totalCards}) should be divisible by cardsPerRow but found ${cardsPerRow}`);
        }

        this.cardsPerRow = cardsPerRow;
    }
    getCardsPerRow(): number {
        return this.cardsPerRow;
    }

    getCards(): Card[] {
        return this.generateCards(this.totalCards);
    }
};
