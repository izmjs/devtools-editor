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
import { takeUntil, filter, withLatestFrom } from 'rxjs/operators';

import { selectConfigEditorState } from '@app/modules/config-editor/config-editor.selectors';
import { selectCurrentNamespace } from '@app/modules/toolbar/toolbar.selectors';
import { ActionServerRestart } from '@app/modules/toolbar/toolbar.actions';
import { MatDialogRef } from '@angular/material';

import { State, IConfig, IItem } from '../../config-editor.model';
import {
  ActionFetchConfig,
  ActionEditItem,
  ActionClearItem,
  ConfigEditorActionTypes
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
  list: IConfig[];
  current: IConfig;
  saved = false;

  constructor(
    private store: Store<State>,
    private actions$: Actions<Action>,
    private dialogRef: MatDialogRef<ContainerComponent>
  ) {}

  ngOnInit() {
    this.actions$
      .pipe(
        ofType(
          ConfigEditorActionTypes.ACTION_EDIT_SETTINGS_ITEM_SUCCESS,
          ConfigEditorActionTypes.ACTION_CLEAR_SETTINGS_ITEM_SUCCESS
        )
      )
      .subscribe(() => {
        this.saved = true;
        setTimeout(() => {
          // this.saved = false;
        }, 10000);
      });
    this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(selectConfigEditorState),
        withLatestFrom(this.store.select(selectCurrentNamespace)),
        filter(([s, ns]) => s.config.length > 0 && ns && !!ns.key)
      )
      .subscribe(([s, ns]) => {
        this.current = s.config.find(one => one.name === ns.key.split(':')[1]);
      });

    this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(selectConfigEditorState)
      )
      .subscribe(s => {
        this.error = s.error;
        this.loading = s.loading;
        this.list = s.config;
      });

    this.store.dispatch(new ActionFetchConfig());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSave(item: IItem) {
    this.store.dispatch(
      new ActionEditItem([
        {
          key: item.key,
          value: item.value,
          scope: item.scope
        }
      ])
    );
  }

  onClear(item: IItem) {
    if (item.value === item.defaultValue) {
      return;
    }

    this.store.dispatch(
      new ActionClearItem([
        {
          key: item.key,
          scope: item.scope,
          remove: true
        }
      ])
    );
  }

  restartServer(ev: MouseEvent) {
    ev.preventDefault();
    this.store.dispatch(new ActionServerRestart());
    this.dialogRef.close();
  }
}
