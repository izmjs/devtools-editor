import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State,
  IConfigEditorState,
  ISharedSettings
} from './config-editor.model';

const SHARED_SETTINGS = [
  {
    name: 'PORT',
    scope: 'http-server',
    key: 'port'
  },
  {
    name: 'HOST',
    scope: 'http-server',
    key: 'host'
  },
  {
    name: 'HTTP_SECURE',
    scope: 'http-server',
    key: 'secure'
  },
  {
    name: 'APP_PREFIX',
    scope: 'general',
    key: 'prefix'
  },
  {
    name: 'ENABLE_CORS',
    scope: 'http-server',
    key: 'cors'
  }
];

export const selectConfigEditorState = createFeatureSelector<
  State,
  IConfigEditorState
>('config-editor');

export const selectSharedSettingsValue = createSelector(
  selectConfigEditorState,
  (state): ISharedSettings =>
    (state.config || []).reduce((prev, cur) => {
      const result = { ...prev };
      cur.items.forEach(item => {
        const found = SHARED_SETTINGS.find(one => one.name === item.key);
        if (found) {
          result[found.key] = item.value;
        }
      });

      return result;
    }, {})
);

export const selectSharedSettings = createSelector(
  selectConfigEditorState,
  state => state.settings
);

export const selectConfigList = createSelector(
  selectConfigEditorState,
  state => state.config || [],
);

export const selectBaseUrl = createSelector(selectSharedSettings, state =>
  state.cors
    ? `http${state.secure ? 's' : ''}://${state.host}:${state.port}${
        state.prefix
      }`
    : state.prefix
);
