import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@app/shared';

import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './home.service';
import { HomeEffects } from './home.effects';
import { HomeReducer } from './home.reducer';
import { HomeMainContainerModule } from './containers/main';
import { PostmanKeyComponent } from './components/postman-key/postman-key.component';

@NgModule({
  declarations: [PostmanKeyComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    HomeMainContainerModule,
    StoreModule.forFeature('home', HomeReducer),
    EffectsModule.forFeature([HomeEffects])
  ],
  providers: [HomeService],
  entryComponents: [PostmanKeyComponent]
})
export class HomeModule {}
