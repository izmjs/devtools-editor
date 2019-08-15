import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiSelectModule } from 'ng2-semantic-ui';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ModelDesignerRoutingModule } from './model-designer-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { ModelDesignerService } from './model-designer.service';
import { ModelDesignerEffects } from './model-designer.effects';
import { ModelDesignerReducer } from './model-designer.reducer';

@NgModule({
  declarations: [ContainerComponent],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    SuiSelectModule,
    ModelDesignerRoutingModule,
    StoreModule.forFeature('model-designer', ModelDesignerReducer),
    EffectsModule.forFeature([ModelDesignerEffects])
  ],
  providers: [ModelDesignerService]
})
export class ModelDesignerModule {}
