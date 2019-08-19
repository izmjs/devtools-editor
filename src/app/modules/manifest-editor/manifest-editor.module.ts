import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@app/shared';

import { ManifestEditorRoutingModule } from './manifest-editor-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { ManifestEditorService } from './manifest-editor.service';
import { ManifestEditorEffects } from './manifest-editor.effects';
import { ManifestEditorReducer } from './manifest-editor.reducer';
import { MetaComponent } from './components/meta/meta.component';
import { DependencyItemComponent } from './components/dependency-item/dependency-item.component';
import { DependenciesComponent } from './components/dependencies/dependencies.component';

@NgModule({
  declarations: [
    ContainerComponent,
    MetaComponent,
    DependencyItemComponent,
    DependenciesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ManifestEditorRoutingModule,
    StoreModule.forFeature('manifest-editor', ManifestEditorReducer),
    EffectsModule.forFeature([ManifestEditorEffects])
  ],
  providers: [ManifestEditorService]
})
export class ManifestEditorModule {}
