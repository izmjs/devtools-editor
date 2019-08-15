import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ApiDesignerService } from './api-designer.service';

@Injectable()
export class ApiDesignerEffects {
  constructor(
    private actions$: Actions<Action>,
    private service: ApiDesignerService
  ) {}
}
