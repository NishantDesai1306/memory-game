import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { NgModule, OpaqueToken, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { 
  MatCardModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdToolbarModule,
  MdIconModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app.routing';
import { GameComponent } from './game/game.component';
import { TimerPipe } from './game/timer.pipe';
import { UnsavedChangesGuard } from './route-guard.service';

@NgModule({
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    RouterModule,
    SharedModule,
    FormsModule,

    MatCardModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    
    FlexLayoutModule,
    BrowserAnimationsModule,
  ],
  declarations: [ 
    AppComponent,
    GameComponent,

    TimerPipe
  ],
  providers: [ UnsavedChangesGuard ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }