import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiSelectModule } from 'ng2-semantic-ui';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { I18NRoutingModule } from './i18n-routing.module';
import { I18NContainerComponent } from './components/container/container.component';
import { I18nComponent } from './components/main/main.component';
import { I18NService } from './i18n.service';
import { i18nReducer } from './i18n.reducer';
import { I18NEffects } from './i18n.effects';

@NgModule({
  declarations: [I18NContainerComponent, I18nComponent],
  imports: [
    CommonModule,
    I18NRoutingModule,
    CommonModule,
    FormsModule,
    SuiSelectModule,
    StoreModule.forFeature('i18n', i18nReducer),
    EffectsModule.forFeature([I18NEffects])
  ],
  providers: [I18NService]
})
export class I18nEditorModule {}
