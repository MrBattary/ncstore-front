import { SIGN_UP_REQUEST, SIGN_UP_RECEIVE, SIGN_UP_ERROR } from './userActionTypes';
import { Dispatch } from 'redux';

export type SignUpRequestAction = {
    type: typeof SIGN_UP_REQUEST;
};
export type SignUpReceiveAction = {
    type: typeof SIGN_UP_RECEIVE;
};
export type SignUpErrorAction = {
    type: typeof SIGN_UP_ERROR;
};

export type SignUp = SignUpRequestAction | SignUpReceiveAction | SignUpErrorAction;

export const signUp = () => async (dispatch: Dispatch<SignUp>) => {};
