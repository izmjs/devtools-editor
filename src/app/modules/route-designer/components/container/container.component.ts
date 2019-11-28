import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { selectCurrentNamespace } from '@modules/toolbar/toolbar.selectors';
import { actionEditFile } from '@modules/toolbar/toolbar.actions';

import { actionLoadItem } from '../../route-designer.actions';
import { selectRouteDesignerState } from '../../route-designer.selectors';
import { State, ILoadable, IController } from '../../route-designer.model';
@Component({
  selector: 'app-router-designer',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RouterDesignerContainerComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  error: HttpErrorResponse;
  loading: boolean;
  current: ILoadable;
  folders: ILoadable[];

  constructor(private store: Store<State>) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit() {
    this.store
      .pipe(takeUntil(this.unsubscribe$), select(selectRouteDesignerState))
      .subscribe(state => {
        this.error = state.error;
        this.folders = state.list;
        this.current = state.current;
      });

    this.store
      .pipe(takeUntil(this.unsubscribe$), select(selectCurrentNamespace))
      .subscribe(() => {
        this.store.dispatch(actionLoadItem({}));
      });
  }

  /**
   * Will be executed every time we select an element that comes from controllers explorer to have the elements in
   * @param $event read-only property indicates which button was pressed on the mouse to trigger the event.
   */
  onSelect($event: ILoadable) {
    if ($event.type === 'controller') {
      const ctrl = <IController>$event;
      return this.store.dispatch(
        actionEditFile({
          payload: {
            file: ctrl.path,
            loc: ctrl.loc
          }
        })
      );
    }
    this.store.dispatch(actionLoadItem({ payload: $event }));
  }

  /**
   * Will be executed every time we want to redisplay the data selected from the breadCrumb
   * @param $event read-only property indicates which button was pressed on the mouse to trigger the event.
   */
  redisplay($event: string) {
    this.store.dispatch(
      actionLoadItem({
        payload: {
          path: $event
        }
      })
    );
  }
}
