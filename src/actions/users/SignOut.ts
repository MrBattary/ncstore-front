import { Dispatch } from 'redux';

import { SIGN_OUT_RECEIVE, SIGN_OUT_REQUEST } from './userActionTypes';
import authApi from '../../api/auth';
import UserCookies from '../../utils/UserCookies';

export type SignOutRequestAction = {
    type: typeof SIGN_OUT_REQUEST;
};
export type SignOutReceiveAction = {
    type: typeof SIGN_OUT_RECEIVE;
};

export type SignOut = SignOutRequestAction | SignOutReceiveAction;

const userCookies = new UserCookies(900);

export const signOut = (token: string) => async (dispatch: Dispatch<SignOut>) => {
    dispatch({ type: SIGN_OUT_REQUEST });
    try {
        await authApi.signOut(token);
    } finally {
        userCookies.clearAllCookies();
        dispatch({ type: SIGN_OUT_RECEIVE });
    }
};
