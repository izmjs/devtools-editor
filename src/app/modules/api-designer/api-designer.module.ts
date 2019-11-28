import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiSelectModule } from 'ng2-semantic-ui';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ApiDesignerRoutingModule } from './api-designer-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { ApiDesignerService } from './api-designer.service';
import { ApiDesignerEffects } from './api-designer.effects';
import { ApiDesignerReducer } from './api-designer.reducer';

@NgModule({
  declarations: [ContainerComponent],
  imports: [
    FormsModule,
    CommonModule,
    SuiSelectModule,
    ApiDesignerRoutingModule,
    StoreModule.forFeature('api-designer', ApiDesignerReducer),
    EffectsModule.forFeature([ApiDesignerEffects])
  ],
  providers: [ApiDesignerService]
})
export class ApiDesignerModule {}
