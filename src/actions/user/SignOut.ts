import { SIGN_OUT_RECEIVE, SIGN_OUT_REQUEST } from './userActionTypes';
import { Dispatch } from 'redux';

export type SignOutRequestAction = {
    type: typeof SIGN_OUT_REQUEST;
};
export type SignOutReceiveAction = {
    type: typeof SIGN_OUT_RECEIVE;
};

export type SignOut = SignOutRequestAction | SignOutReceiveAction;

export const signOut = () => async (dispatch: Dispatch<SignOut>) => {
    dispatch({ type: SIGN_OUT_REQUEST });
    dispatch({ type: SIGN_OUT_RECEIVE });
};
