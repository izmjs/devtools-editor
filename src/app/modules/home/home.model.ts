import { AppState } from '@app/core';
import { HttpErrorResponse } from '@angular/common/http';

export interface IPostmanCollection {
  id: string;
  owner: string;
  name: string;
  uid: string;
}

export interface IHomeState {
  collections: {
    loading: boolean;
    error: any;
    list: IPostmanCollection[];
    current: IPostmanCollection;
  };
}

export interface State extends AppState {
  'home': IHomeState;
}
