import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { GameComponent } from './game/game.component';
import { UnsavedChangesGuard } from './route-guard.service';

const appRoutes: Routes = [
    {
      path: 'game', 
      component: GameComponent, 
      canDeactivate: [UnsavedChangesGuard]
    },
    {
      path: '', 
      redirectTo: '/game', 
      pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
