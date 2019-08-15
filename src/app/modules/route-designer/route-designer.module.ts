import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiSelectModule } from 'ng2-semantic-ui';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { RouteDesignerRoutingModule } from './route-designer-routing.module';
import { RouterDesignerContainerComponent } from './components/container/container.component';
import { ControllersExplorerComponent } from './components/controllers-explorer/controllers-explorer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

import { RouteDesignerService } from './route-designer.service';
import { RouteDesignerEffects } from './route-designer.effects';
import { RouteDesignerReducer } from './route-designer.reducer';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
    RouterDesignerContainerComponent,
    ControllersExplorerComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouteDesignerRoutingModule,
    StoreModule.forFeature('route-designer', RouteDesignerReducer),
    EffectsModule.forFeature([RouteDesignerEffects])
  ],
  providers: [RouteDesignerService]
})
export class RouteDesignerModule {}
