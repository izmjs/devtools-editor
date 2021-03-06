import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import {
  MatTreeModule,
  MatMenuModule,
  MatTabsModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatChipsModule,
  MatInputModule,
  MatBadgeModule,
  MatButtonModule,
  MatDialogModule,
  MatSliderModule,
  MatSelectModule,
  MatStepperModule,
  MatToolbarModule,
  MatDividerModule,
  MatTooltipModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCog,
  faBars,
  faPlus,
  faEdit,
  faBook,
  faTrash,
  faTimes,
  faTasks,
  faCheck,
  faFilter,
  faSquare,
  faStream,
  faRocket,
  faCaretUp,
  faLanguage,
  faPowerOff,
  faLightbulb,
  faCaretDown,
  faPaintBrush,
  faUserCircle,
  faPlayCircle,
  faWindowMaximize,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

import { BigInputComponent } from './big-input/big-input.component';
import { BigInputActionComponent } from './big-input/big-input-action.component';
import { RtlSupportDirective } from './rtl-support/rtl-support.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTreeModule } from '@angular/cdk/tree';
import { SuiSelectModule, SuiPopupModule, SuiTabsModule, SuiCheckboxModule } from 'ng2-semantic-ui';
import { LowercaseDirective } from './lowercase';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatToolbarModule,
    MatDividerModule,
    MatTooltipModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,

    FontAwesomeModule,
    SuiSelectModule,
    SuiPopupModule,
    SuiTabsModule,
    SuiCheckboxModule,
  ],
  declarations: [
    TruncatePipe,
    BigInputComponent,
    LowercaseDirective,
    RtlSupportDirective,
    BigInputActionComponent,
  ],
  exports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    TranslateModule,

    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    CdkTreeModule,
    MatTreeModule,
    DragDropModule,
    MatBadgeModule,
    MatChipsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSliderModule,
    MatStepperModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,

    FontAwesomeModule,

    TruncatePipe,
    SuiTabsModule,
    SuiPopupModule,
    SuiSelectModule,
    BigInputComponent,
    SuiCheckboxModule,
    LowercaseDirective,
    RtlSupportDirective,
    BigInputActionComponent,
  ]
})
export class SharedModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faCog,
      faBars,
      faBook,
      faPlus,
      faEdit,
      faTrash,
      faTimes,
      faFilter,
      faTasks,
      faCheck,
      faSquare,
      faStream,
      faRocket,
      faGithub,
      faTwitter,
      faMediumM,
      faCaretUp,
      faYoutube,
      faLanguage,
      faPowerOff,
      faCaretDown,
      faLightbulb,
      faInstagram,
      faPaintBrush,
      faUserCircle,
      faPlayCircle,
      faWindowMaximize,
      faExclamationTriangle,
    );
  }
}
