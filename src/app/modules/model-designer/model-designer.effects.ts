import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ModelDesignerService } from './model-designer.service';

@Injectable()
export class ModelDesignerEffects {
  constructor(
    private actions$: Actions<Action>,
    private service: ModelDesignerService
  ) {}
}
