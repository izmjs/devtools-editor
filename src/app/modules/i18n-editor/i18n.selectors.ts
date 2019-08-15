import { createFeatureSelector } from '@ngrx/store';
import { State, II18NState } from './i18n.model';

export const selectI18NState = createFeatureSelector<State, II18NState>('i18n');
