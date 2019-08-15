import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';

import { ToolbarComponent } from './components/main/main.component';
import { toolbarReducer } from './toolbar.reducer';
import { ToolbarEffects } from './toolbar.effects';
import { ToolbarService } from './toolbar.service';
import { SharedModule } from '@app/shared';
import { GenerateModuleComponent } from './components/generate-module/generate-module.component';

@NgModule({
  declarations: [ToolbarComponent, GenerateModuleComponent],
  exports: [ToolbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    StoreModule.forFeature('toolbar', toolbarReducer),
    EffectsModule.forFeature([ToolbarEffects])
  ],
  providers: [ToolbarService],
  entryComponents: [GenerateModuleComponent]
})
export class ToolbarModule {}
