import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoadable } from './route-designer.model';

const PREFIX = '/api/v1/devtools';

@Injectable()
export class RouteDesignerService {
  constructor(private http: HttpClient) {}

  /**
   * Get the tree(folders/files/controllers) of a specific module
   * @param baseFolder the payload (The base folder where we want to extract controllers)
   * @param ns The namespace (usually it is has the form `type`:`module`. `type`: The type of the module (`vendor` or `modules`), and `module`: The name of the module)
   */
  getContent(
    baseFolder: string = '',
    ns: string = 'modules:devtools'
  ): Observable<ILoadable[]> {
    return this.http.get<ILoadable[]>(`${PREFIX}/controllers`, {
      params: {
        $folder: baseFolder,
        ns
      }
    });
  }
}
