import { Dispatch } from 'redux';

import { SIGN_IN_REQUEST, SIGN_IN_RECEIVE, SIGN_IN_ERROR } from './userActionTypes';
import authApi from '../../api/auth';
import { SignInDetails } from '../../types/SignInDetails';

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

export const signIn = (signInDetails: SignInDetails) => async (dispatch: Dispatch<SignIn>) => {
    dispatch({ type: SIGN_IN_REQUEST });
    try {
        const data = await authApi.signIn(signInDetails);
        dispatch({ type: SIGN_IN_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: SIGN_IN_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: SIGN_IN_ERROR });
        }
    }
};
