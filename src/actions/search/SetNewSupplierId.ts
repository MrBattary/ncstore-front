import { Dispatch } from 'redux';

import { SET_NEW_SUPPLIER_ID } from './searchActionTypes';

export type SetNewSupplierIdAction = {
    type: typeof SET_NEW_SUPPLIER_ID;
    payload: string;
};

export const setNewSupplierId = (newSupplierId: string) => (dispatch: Dispatch<SetNewSupplierIdAction>) => {
    dispatch({ type: SET_NEW_SUPPLIER_ID, payload: newSupplierId });
};
