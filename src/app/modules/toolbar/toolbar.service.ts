import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { INamespace, IFileLocation, IGenerateModuleData } from './toolbar.model';
import { delay, retryWhen, catchError } from 'rxjs/operators';

const PREFIX = '/api/v1/devtools';

@Injectable()
export class ToolbarService {
  constructor(private http: HttpClient) {}

  /**
   * Get list of available namespaces
   */
  namespaces(): Observable<INamespace[]> {
    return this.http.get<INamespace[]>(`${PREFIX}/i18n/ns`);
  }

  /**
   * Restart the server
   */
  restartServer(): Observable<void> {
    return this.http.post<void>(`${PREFIX}/manage/reload`, {});
  }

  /**
   * Restart the server
   */
  checkServer(): Observable<void> {
    return this.http.get<void>(`${PREFIX}/manage/check`, {}).pipe(
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
    return this.http.post<void>(`${PREFIX}/manage/add-module`, data);
  }

  /**
   * Edit current project in vscode
   */
  editProject(): Observable<void> {
    return this.http.post<void>(`${PREFIX}/files/edit`, {});
  }

  /**
   * Edit a specific file in vscode
   */
  editFile(location: IFileLocation, ns = 'modules:devtools'): Observable<void> {
    return this.http.get<void>(`${PREFIX}/files/open`, {
      params: {
        file: location.file,
        line: location.loc.line.toString(),
        column: location.loc.column.toString(),
        ns: location.isAbsolute === true ? '' : ns
      }
    });
  }
}
