import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatTreeModule } from '@angular/material/tree';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
