import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'placeholder',
  templateUrl: './placeholder.component.html'
})
export class PlaceholderComponent implements OnInit {
    @Input() time: number = 0;
    @Output() complete: EventEmitter<any> = new EventEmitter();
    
    constructor() {}

    private progressValue = 0;

    ngOnInit() {
        const handle = setInterval(() => {
            this.progressValue++;

            if(this.progressValue === 100) {
                clearInterval(handle);
                this.complete.next();
            }
        }, this.time/100)
    }    
}