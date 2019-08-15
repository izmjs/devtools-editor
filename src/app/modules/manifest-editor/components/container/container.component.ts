import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State, IMetadata, ILightMetadata, ModuleType, IModuleType } from '../../manifest-editor.model';
import { selectMetadata, selectInstalledModules, selectDepsLoading, selectSearchResult } from '../../manifest-editor.selectors';
import { ActionLoadMetadata, ActionSaveMetadata, ActionListInstalled, ActionSearchModule, ActionInstallModule } from '../../manifest-editor.actions';
import { takeUntil } from 'rxjs/operators';
import { selectCurrentNamespace } from '@app/modules/toolbar/toolbar.selectors';

@Component({
  selector: 'app-router-designer',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  meta$: Observable<IMetadata>;
  installed$: Observable<ILightMetadata[]>;
  loading$: Observable<boolean>;
  list$: Observable<IMetadata[]>;

  constructor(private store: Store<State>) {
    this.meta$ = this.store.select(selectMetadata);
    this.installed$ = this.store.select(selectInstalledModules);
    this.loading$ = this.store.select(selectDepsLoading);
    this.list$ = this.store.select(selectSearchResult);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(selectCurrentNamespace)
      )
      .subscribe(() => {
        this.store.dispatch(new ActionLoadMetadata());
        this.store.dispatch(new ActionListInstalled('prod'));
      });
    this.store.dispatch(new ActionSearchModule('express'));
  }

  onMetadaSave(metadata: IMetadata) {
    this.store.dispatch(new ActionSaveMetadata(metadata));
  }

  onTypeChange(moduleType: IModuleType) {
    this.store.dispatch(new ActionListInstalled(moduleType.type));
  }

  onSearch(text: string) {
    this.store.dispatch(new ActionSearchModule(text));
  }

  onInstall(data: { item: IMetadata; mode: ModuleType; }) {
    const { name, version } = data.item;
    const { mode } = data;

    this.store.dispatch(new ActionInstallModule({ name, version, mode }));
  }
}
