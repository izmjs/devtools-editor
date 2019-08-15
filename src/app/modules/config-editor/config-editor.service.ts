import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IConfig, IKeyValue, IItem } from './config-editor.model';

const PREFIX = '/api/v1/devtools/config';

@Injectable()
export class ConfigEditorService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<IConfig[]> {
    return this.http.get<IConfig[]>(`${PREFIX}`);
  }

  set(items: IKeyValue[] = []): Observable<void> {
    return this.http.put<void>(`${PREFIX}/set`, items);
  }
}
