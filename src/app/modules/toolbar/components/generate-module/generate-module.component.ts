import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { IGenerateModuleData, State } from '../../toolbar.model';
import { ActionGenerateModule } from '../../toolbar.actions';

@Component({
  selector: 'app-generate-module',
  templateUrl: './generate-module.component.html',
  styleUrls: ['./generate-module.component.scss']
})
export class GenerateModuleComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  data: IGenerateModuleData = {
    git: true,
    install: false,
    name: 'new-module-name'
  };

  constructor(
    private store: Store<State>,
    private dialogRef: MatDialogRef<GenerateModuleComponent>
  ) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onCreate() {
    this.store.dispatch(new ActionGenerateModule(this.data));
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onInput(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
      this.onCreate();
    }
  }
}
