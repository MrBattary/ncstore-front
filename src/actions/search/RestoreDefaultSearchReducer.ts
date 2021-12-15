import { Dispatch } from 'redux';

import { RESTORE_DEFAULT_SEARCH_REDUCER } from './searchActionTypes';

export type RestoreDefaultSearchReducerAction = {
    type: typeof RESTORE_DEFAULT_SEARCH_REDUCER;
};

export const restoreDefaultSearchReducer = () => (dispatch: Dispatch<RestoreDefaultSearchReducerAction>) => {
    dispatch({ type: RESTORE_DEFAULT_SEARCH_REDUCER });
};
