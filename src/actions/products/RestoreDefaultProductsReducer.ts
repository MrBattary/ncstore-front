import { Dispatch } from 'redux';

import { RESTORE_DEFAULT_PRODUCTS_REDUCER } from './productActionTypes';

export type RestoreDefaultProductsReducerAction = {
    type: typeof RESTORE_DEFAULT_PRODUCTS_REDUCER;
};

export const restoreDefaultProductsReducer = () => (dispatch: Dispatch<RestoreDefaultProductsReducerAction>) => {
    dispatch({ type: RESTORE_DEFAULT_PRODUCTS_REDUCER });
};
