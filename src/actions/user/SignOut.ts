import { SIGN_OUT_RECEIVE, SIGN_OUT_REQUEST } from './userActionTypes';
import { Dispatch } from 'redux';

export type SignOutRequestAction = {
    type: typeof SIGN_OUT_REQUEST;
};
export type SignOutReceiveAction = {
    type: typeof SIGN_OUT_RECEIVE;
};

export type SignOut = SignOutRequestAction | SignOutReceiveAction;

export const signIn = () => async (dispatch: Dispatch<SignOut>) => {};
