import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoadable } from './route-designer.model';
import { Store, select } from '@ngrx/store';
import { State } from '../toolbar/toolbar.model';
import { selectBaseUrl } from '../config-editor/config-editor.selectors';
import { tap } from 'rxjs/operators';

const PREFIX = '/devtools';

@Injectable()
export class RouteDesignerService {
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

  /**
   * Get the tree(folders/files/controllers) of a specific module
   * @param baseFolder the payload (The base folder where we want to extract controllers)
   * @param ns The namespace (usually it is has the form `type`:`module`. `type`: The type of the module (`vendor` or `modules`), and `module`: The name of the module)
   */
  getContent(
    baseFolder: string = '',
    ns: string = 'modules:devtools'
  ): Observable<ILoadable[]> {
    return this.http.get<ILoadable[]>(`${this.prefix}/controllers`, {
      params: {
        $folder: baseFolder,
        ns
      }
    });
  }
}
