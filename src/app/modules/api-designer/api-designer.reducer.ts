import { IApiDesignerState } from './api-designer.model';
import { ApiDesignerActions } from './api-designer.actions';

export const initialState: IApiDesignerState = {
  loading: false
};

export function ApiDesignerReducer(
  state: IApiDesignerState = initialState,
  action: ApiDesignerActions
): IApiDesignerState {
  switch (action.type) {
    default:
      return state;
  }
}
