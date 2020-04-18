import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IConfig, IKeyValue, IItem } from './config-editor.model';
import { Store, select } from '@ngrx/store';
import { State } from '../toolbar/toolbar.model';
import { selectBaseUrl } from './config-editor.selectors';
import { tap } from 'rxjs/operators';

const PREFIX = '/devtools/config';

@Injectable()
export class ConfigEditorService {
  private prefix = '/api/v1';
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store<State>
  ) {
    this.store
      .pipe(
        select(selectBaseUrl),
        tap(value => (this.prefix = `${value}${PREFIX}`))
      )
      .subscribe();
  }

  fetch(): Observable<IConfig[]> {
    return this.http.get<IConfig[]>(`${this.prefix}`);
  }

  set(items: IKeyValue[] = []): Observable<IConfig[]> {
    return this.http.put<IConfig[]>(`${this.prefix}/set`, items);
  }
}
