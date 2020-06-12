import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPostmanCollection } from './home.model';
import { Observable } from 'rxjs';

const PREFIX = '/api/v1';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}

  fetchCollections(): Observable<IPostmanCollection[]> {
    return this.http.get<IPostmanCollection[]>(`${PREFIX}/devtools/postman/collections`)
  }

  syncCollection(collection: IPostmanCollection): Observable<IPostmanCollection[]> {
    return this.http.put<IPostmanCollection[]>(`${PREFIX}/devtools/postman/collections/${collection.id}`, {});
  }

  setPostmanKey(key: string): Observable<void> {
    return this.http.put<void>(`${PREFIX}/devtools/config/set`, [{
      key: 'POSTMAN_KEY',
      scope: 'devtools',
      value: key,
    }]);
  }
}
