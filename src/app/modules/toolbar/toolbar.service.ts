import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  INamespace,
  IFileLocation,
  IGenerateModuleData
} from './toolbar.model';
import { delay, retryWhen, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from './toolbar.model';
import { selectBaseUrl } from '../config-editor/config-editor.selectors';
import { tap } from 'rxjs/operators';

const PREFIX = '/devtools';

@Injectable()
export class ToolbarService {
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
   * Get list of available namespaces
   */
  namespaces(): Observable<INamespace[]> {
    return this.http.get<INamespace[]>(`${this.prefix}/i18n/ns`);
  }

  /**
   * Restart the server
   */
  restartServer(): Observable<void> {
    return this.http.post<void>(`${this.prefix}/manage/reload`, {});
  }

  /**
   * Restart the server
   */
  checkServer(): Observable<void> {
    return this.http.get<void>(`${this.prefix}/manage/check`, {}).pipe(
      catchError(err => {
        err.notify = false;
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(delay(1000)))
    );
  }

  /**
   * Generate new module
   */
  generateModule(data: IGenerateModuleData): Observable<void> {
    return this.http.post<void>(`${this.prefix}/manage/add-module`, data);
  }

  /**
   * Edit current project in vscode
   */
  editProject(): Observable<void> {
    return this.http.post<void>(`${this.prefix}/files/edit`, {});
  }

  /**
   * Edit a specific file in vscode
   */
  editFile(location: IFileLocation, ns = 'modules:devtools'): Observable<void> {
    return this.http.get<void>(`${this.prefix}/files/open`, {
      params: {
        file: location.file,
        line: location.loc.line.toString(),
        column: location.loc.column.toString(),
        ns: location.isAbsolute === true ? '' : ns
      }
    });
  }
}
