import { Dispatch } from 'redux';
import { RESTORE_DEFAULT_USER_REDUCER } from './userActionTypes';

export type RestoreDefaultUserReducer = {
    type: typeof RESTORE_DEFAULT_USER_REDUCER;
};

export const restoreDefaultUserReducer = () => async (dispatch: Dispatch<RestoreDefaultUserReducer>) => {
    dispatch({ type: RESTORE_DEFAULT_USER_REDUCER });
};
