import { Dispatch } from 'redux';

import { SIGN_OUT_RECEIVE, SIGN_OUT_REQUEST } from './userActionTypes';
import authApi from '../../api/auth';

export type SignOutRequestAction = {
    type: typeof SIGN_OUT_REQUEST;
};
export type SignOutReceiveAction = {
    type: typeof SIGN_OUT_RECEIVE;
};

export type SignOut = SignOutRequestAction | SignOutReceiveAction;

export const signOut = (token: string) => async (dispatch: Dispatch<SignOut>) => {
    dispatch({ type: SIGN_OUT_REQUEST });
    try {
        await authApi.signOut(token);
    } finally {
        dispatch({ type: SIGN_OUT_RECEIVE });
    }
};
