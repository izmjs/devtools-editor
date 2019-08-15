import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMetadata, ILightMetadata, ModuleType } from './manifest-editor.model';

const PREFIX = '/api/v1/devtools/npm';

@Injectable()
export class ManifestEditorService {
  constructor(private http: HttpClient) {}

  meta(ns = 'modules:devtools'): Observable<IMetadata> {
    return this.http.get<IMetadata>(`${PREFIX}/meta`, {
      params: {
        ns
      }
    });
  }

  installed(mode = 'prod', ns = 'modules:devtools'): Observable<ILightMetadata[]> {
    return this.http.get<ILightMetadata[]>(`${PREFIX}/installed`, {
      params: {
        ns,
        mode,
      }
    });
  }

  search(text, { top = 24, skip = 0 }): Observable<IMetadata[]> {
    return this.http.get<IMetadata[]>(`${PREFIX}/search`, {
      params: {
        text,
        $top: '' + top,
        $skip: '' + skip,
      }
    });
  }

  saveMeta(data: IMetadata, ns = 'modules:devtools'): Observable<void> {
    return this.http.post<void>(`${PREFIX}/meta`, data, {
      params: {
        ns
      }
    });
  }

  install(
    data: { name: string; version: string; mode: ModuleType },
    ns = 'modules:devtools'): Observable<void> {
    return this.http.post<void>(`${PREFIX}/install`, data, {
      params: {
        ns
      }
    });
  }
}
