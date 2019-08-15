import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
  ILanguage,
  ISentence,
  ITranslation,
  State,
  II18NState
} from '../../i18n.model';
import { I18nComponent } from '../main/main.component';
import { selectI18NState } from '../../i18n.selectors';
import {
  ActionI18NRetrieve,
  ActionI18NRemoveLanguages,
  ActionI18NRemoveEntries,
  ActionI18NUpdateEntries,
  ActionI18NAddLanguage,
  ActionI18NUpdateEntry
} from '../../i18n.actions';
import { selectCurrentNamespace } from '@modules/toolbar/toolbar.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-i18n-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class I18NContainerComponent implements OnInit, OnDestroy {
  @ViewChild('compo') comp: I18nComponent;
  languages: ILanguage[] = [];
  sentences: ISentence[] = [];
  i18n$: Observable<II18NState>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<State>) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(selectI18NState)
      )
      .subscribe(state => {
        this.sentences = state.entries;
        this.languages = state.lngs;
        this.comp.working = state.loading;
      });

    this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(selectCurrentNamespace)
      )
      .subscribe(() => {
        this.store.dispatch(new ActionI18NRetrieve());
      });
  }

  /**
   * Will be executed every time we remove an entry
   * @param entry The sentence to remove
   */
  onRemove(entry: ISentence) {
    this.store.dispatch(new ActionI18NRemoveEntries([entry.key]));
  }

  /**
   * Will be executed every time we remove a language
   * @param entry The sentence to remove
   */
  onRemoveLanguage(language: ILanguage) {
    this.store.dispatch(new ActionI18NRemoveLanguages([language.key]));
  }

  /**
   * Will be executed every time we update a language
   * @param entry The sentence to remove
   */
  onUpdateLanguage(tr: ITranslation) {
    const payload: ISentence[] = tr.entries.map(one => {
      const obj = {
        key: one.key
      };
      obj[tr.lng.key] = one[tr.lng.key];
      return obj;
    });

    this.store.dispatch(new ActionI18NUpdateEntries(payload));
  }

  /**
   * Will be executed every time we update a language
   * @param entry The sentence to remove
   */
  onAddLanguage(lng: ILanguage) {
    this.store.dispatch(new ActionI18NAddLanguage(lng));
  }

  /**
   * Will be executed every time we update an entry
   * @param entry The entry to update
   */
  onUpdate(entry: ISentence) {
    this.store.dispatch(new ActionI18NUpdateEntry(entry));
  }

  /**
   * Will be executed every time we create a new entry
   * @param entry The entry to create
   */
  onCreate(entry: ISentence) {
    this.store.dispatch(new ActionI18NUpdateEntry(entry));
  }
}
