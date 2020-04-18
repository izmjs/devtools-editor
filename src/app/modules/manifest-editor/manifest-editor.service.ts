import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMetadata, ILightMetadata, ModuleType } from './manifest-editor.model';
import { Store, select } from '@ngrx/store';
import { State } from '../toolbar/toolbar.model';
import { selectBaseUrl } from '../config-editor/config-editor.selectors';
import { tap } from 'rxjs/operators';

const PREFIX = '/devtools/npm';

@Injectable()
export class ManifestEditorService {
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

  meta(ns = 'modules:devtools'): Observable<IMetadata> {
    return this.http.get<IMetadata>(`${this.prefix}/meta`, {
      params: {
        ns
      }
    });
  }

  installed(
    mode = 'prod',
    ns = 'modules:devtools'
  ): Observable<ILightMetadata[]> {
    return this.http.get<ILightMetadata[]>(`${this.prefix}/installed`, {
      params: {
        ns,
        mode
      }
    });
  }

  search(text, { top = 24, skip = 0 }): Observable<IMetadata[]> {
    return this.http.get<IMetadata[]>(`${this.prefix}/search`, {
      params: {
        text,
        $top: '' + top,
        $skip: '' + skip
      }
    });
  }

  saveMeta(data: IMetadata, ns = 'modules:devtools'): Observable<void> {
    return this.http.post<void>(`${this.prefix}/meta`, data, {
      params: {
        ns
      }
    });
  }

  install(
    data: { name: string; version: string; mode: ModuleType },
    ns = 'modules:devtools'
  ): Observable<void> {
    return this.http.post<void>(`${this.prefix}/install`, data, {
      params: {
        ns
      }
    });
  }
}
