import { Dispatch } from 'redux';

import { SET_NEW_SORT_ORDER } from './searchActionTypes';
import { SortOrder } from '../../types/SortEnum';

export type SetNewSortOrderAction = {
    type: typeof SET_NEW_SORT_ORDER;
    payload: SortOrder;
};

export const setNewSortOrder = (newSortOrder: SortOrder) => (dispatch: Dispatch<SetNewSortOrderAction>) => {
    dispatch({ type: SET_NEW_SORT_ORDER, payload: newSortOrder });
};
