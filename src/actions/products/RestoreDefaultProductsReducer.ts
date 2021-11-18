import { Dispatch } from 'redux';

import { RESTORE_DEFAULT_PRODUCTS_REDUCER } from './productActionTypes';

export type RestoreDefaultProductsReducer = {
    type: typeof RESTORE_DEFAULT_PRODUCTS_REDUCER;
};

export const restoreDefaultProductsReducer = () => (dispatch: Dispatch<RestoreDefaultProductsReducer>) => {
    dispatch({ type: RESTORE_DEFAULT_PRODUCTS_REDUCER });
};
