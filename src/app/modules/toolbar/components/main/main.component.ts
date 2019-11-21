import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ActionServerRestart,
  ActionRetrieveNamespaces,
  ActionSetCurrentNamespace,
  ActionEditProject,
  ActionAddModule
} from '@modules/toolbar/toolbar.actions';

import { INamespace, State } from '../../toolbar.model';
import { selectNamespaces, selectRestartServer } from '../../toolbar.selectors';
import { TasksService } from '../../tasks.service';
import { takeUntil } from 'rxjs/operators';
import { actionEditSettings } from '@app/modules/config-editor/config-editor.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  namespaces: INamespace[] = [];
  current: INamespace;
  restarting: boolean;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<State>, private tasks: TasksService) {
    store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(selectNamespaces)
      )
      .subscribe(state => {
        this.namespaces = state.list;
        this.current = state.current;
      });

    store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(selectRestartServer)
      )
      .subscribe(state => {
        this.restarting = state.loading;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.store.dispatch(new ActionRetrieveNamespaces());
    this.tasks
      .getMessage()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  onNameSpaceChange(ns: INamespace) {
    this.store.dispatch(new ActionSetCurrentNamespace(ns));
  }

  restart() {
    this.store.dispatch(new ActionServerRestart());
  }

  editProject() {
    this.store.dispatch(new ActionEditProject());
  }

  editSettings() {
    this.store.dispatch(actionEditSettings());
  }

  refreshNS() {
    this.store.dispatch(new ActionRetrieveNamespaces());
  }

  createModule() {
    this.store.dispatch(new ActionAddModule());
  }
}
