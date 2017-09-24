import {CanDeactivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import { GameComponent } from './game/game.component';
 
@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<GameComponent> {
 
    constructor(private _router:Router){}
 
    canDeactivate(gameComponent: GameComponent) {
      return gameComponent.canDeactivate() ?
        true :
        window.confirm("You have unsaved changes. Still want to leave?");
    }
}