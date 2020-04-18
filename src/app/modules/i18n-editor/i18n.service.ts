import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITranslations, ISentence, IKeyValue } from './i18n.model';
import { Store, select } from '@ngrx/store';
import { State } from '../toolbar/toolbar.model';
import { selectBaseUrl } from '../config-editor/config-editor.selectors';
import { tap } from 'rxjs/operators';

const PREFIX = '/devtools/i18n';

@Injectable()
export class I18NService {
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
   * Get i18n of a specific module
   * @param ns The namespace (usually it is has the form `type`:`module`. `type`: The type of the module (`vendor` or `modules`), and `module`: The name of the module)
   */
  retrieve(ns = 'modules:devtools'): Observable<ITranslations> {
    return this.http.get<ITranslations>(this.prefix, {
      params: {
        ns
      }
    });
  }

  /**
   * Add or edit keys in specific module
   * @param data tha payload
   * @param ns The namespace (usually it is has the form `type`:`module`. `type`: The type of the module (`vendor` or `modules`), and `module`: The name of the module)
   */
  set(
    data: ISentence | ISentence[],
    ns = 'modules:devtools'
  ): Observable<void> {
    return this.http.post<void>(this.prefix, data, {
      params: {
        ns
      }
    });
  }

  /**
   * Remove i18n key(s) from a namespace
   * @param keys List of keys to remove
   * @param ns The namespace (usually it is has the form `type`:`module`. `type`: The type of the module (`vendor` or `modules`), and `module`: The name of the module)
   */
  remove(keys: string[], ns = 'modules:devtools'): Observable<void> {
    return this.http.post<void>(`${this.prefix}/delete`, keys, {
      params: {
        ns
      }
    });
  }

  /**
   * Automatically translate to a specific language
   * @param data An object containing the language code
   * @param ns The namespace (usually it is has the form `type`:`module`. `type`: The type of the module (`vendor` or `modules`), and `module`: The name of the module)
   */
  translate(code: string, ns = 'modules:devtools'): Observable<IKeyValue> {
    return this.http.post<IKeyValue>(
      `${this.prefix}/translate`,
      { code },
      {
        params: {
          ns
        }
      }
    );
  }

  /**
   * Remove one or multiple i18n files
   * @param list List of languages to remove
   * @param ns The namespace (usually it is has the form `type`:`module`. `type`: The type of the module (`vendor` or `modules`), and `module`: The name of the module)
   */
  removeLanguages(list: string[], ns = 'modules:devtools'): Observable<void> {
    return this.http.post<void>(`${this.prefix}/lngs/delete`, list, {
      params: {
        ns
      }
    });
  }
}
