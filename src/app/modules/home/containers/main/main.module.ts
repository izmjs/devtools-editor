import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StrategyService } from './strategy.service';
import { HomeMainContainer } from './main.container';

@NgModule({
  imports: [SharedModule],
  providers: [StrategyService],
  declarations: [HomeMainContainer]
})
export class HomeMainContainerModule {}
