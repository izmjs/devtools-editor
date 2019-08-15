import { IModelDesignerState } from './model-designer.model';
import { ModelDesignerActions } from './model-designer.actions';

export const initialState: IModelDesignerState = {
  loading: false
};

export function ModelDesignerReducer(
  state: IModelDesignerState = initialState,
  action: ModelDesignerActions
): IModelDesignerState {
  switch (action.type) {
    default:
      return state;
  }
}
