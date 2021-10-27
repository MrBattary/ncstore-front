import { SIGN_IN_REQUEST, SIGN_IN_RECEIVE, SIGN_IN_ERROR } from './userActionTypes';
import { Dispatch } from 'redux';

export type SignInRequestAction = {
    type: typeof SIGN_IN_REQUEST;
};
export type SignInReceiveAction = {
    type: typeof SIGN_IN_RECEIVE;
};
export type SignInErrorAction = {
    type: typeof SIGN_IN_ERROR;
};

export type SignIn = SignInRequestAction | SignInReceiveAction | SignInErrorAction;

export const signIn = () => async (dispatch: Dispatch<SignIn>) => {};
