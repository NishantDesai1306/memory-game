import { FormsModule } from '@angular/forms';
import { GameComponent } from './game.component';
import { TimerPipe } from './timer.pipe';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { 
    MatCardModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdIconModule,
    MdProgressBarModule
} from '@angular/material';
  
import {FlexLayoutModule} from '@angular/flex-layout';
import { GameService } from '../shared/game.service';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,

        MatCardModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdIconModule,
        MdProgressBarModule,
        
        FlexLayoutModule,
    ],
    exports: [],
    declarations: [ 
        PlaceholderComponent,
        GameComponent,
    
        TimerPipe
    ],    
    providers: [
        GameService
    ]
})
export class GameModule { }
