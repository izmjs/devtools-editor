import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  takeUntil,
  distinctUntilChanged,
  tap,
  first,
  filter
} from 'rxjs/operators';

import {
  selectConfigEditorState,
  selectConfigList
} from '@app/modules/config-editor/config-editor.selectors';
import { actionServerRestart } from '@app/modules/toolbar/toolbar.actions';
import { MatDialogRef } from '@angular/material/dialog';

import { State, IConfig, IItem } from '../../config-editor.model';
import {
  actionEditItem,
  actionClearItem,
  actionFetchConfig,
  actionEditItemSuccess,
  actionClearItemSuccess
} from '../../config-editor.actions';

@Component({
  selector: 'app-router-designer',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ContainerComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  error: HttpErrorResponse;
  loading: boolean;
  list: IConfig[] = [];
  current: IConfig;
  saved = false;

  constructor(
    private store: Store<State>,
    private actions$: Actions<Action>,
    private dialogRef: MatDialogRef<ContainerComponent>
  ) {}

  ngOnInit() {
    this.actions$
      .pipe(ofType(actionEditItemSuccess, actionClearItemSuccess))
      .subscribe(() => {
        this.saved = true;
      });

    this.store
      .pipe(takeUntil(this.unsubscribe$), select(selectConfigEditorState))
      .subscribe(s => {
        this.error = s.error;
        this.loading = s.loading;
      });

    this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(selectConfigList),
        filter(list => list.length > 0),
        first(),
        tap(list => (this.list = JSON.parse(JSON.stringify(list))))
      )
      .subscribe();

    this.store.dispatch(actionFetchConfig());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSave(item: IItem) {
    this.store.dispatch(
      actionEditItem({
        payload: [
          {
            key: item.key,
            value: item.value,
            scope: item.scope
          }
        ]
      })
    );
  }

  onClear(item: IItem) {
    if (item.value === item.defaultValue) {
      return;
    }

    this.store.dispatch(
      actionClearItem({
        payload: [
          {
            key: item.key,
            scope: item.scope,
            remove: true
          }
        ]
      })
    );
  }

  restartServer(ev: MouseEvent) {
    ev.preventDefault();
    this.store.dispatch(actionServerRestart());
    this.dialogRef.close();
  }
}
