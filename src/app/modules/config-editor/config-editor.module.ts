import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@app/shared';

import { ContainerComponent } from './components/container/container.component';
import { ConfigEditorService } from './config-editor.service';
import { ConfigEditorEffects } from './config-editor.effects';
import { ConfigEditorReducer } from './config-editor.reducer';
import { MainComponent } from './components/main/main.component';
import { FieldComponent } from './components/field/field.component';
import { AsTitlePipe } from './pipes/as-title.pipe';

@NgModule({
  declarations: [
    MainComponent,
    FieldComponent,
    ContainerComponent,
    AsTitlePipe,
  ],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    SharedModule,
    StoreModule.forFeature('config-editor', ConfigEditorReducer),
    EffectsModule.forFeature([ConfigEditorEffects])
  ],
  providers: [ConfigEditorService],
  entryComponents: [ContainerComponent],
})
export class ConfigEditorModule {}
