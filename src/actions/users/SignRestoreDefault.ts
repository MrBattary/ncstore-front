import { Dispatch } from 'redux';
import { SIGN_RESTORE_DEFAULT } from './userActionTypes';

export type SignRestoreDefault = {
    type: typeof SIGN_RESTORE_DEFAULT;
};

export const signRestoreDefault = () => async (dispatch: Dispatch<SignRestoreDefault>) => {
    dispatch({ type: SIGN_RESTORE_DEFAULT });
};
