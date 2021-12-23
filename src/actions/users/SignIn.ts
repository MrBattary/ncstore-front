import { Dispatch } from 'redux';

import { SIGN_IN_ERROR, SIGN_IN_RECEIVE, SIGN_IN_REQUEST } from './userActionTypes';
import authApi from '../../api/auth';
import { SignInDetails, SignInResponse } from '../../types/SignInDetails';
import UserCookies from '../../utils/UserCookies';

export type SignInRequestAction = {
    type: typeof SIGN_IN_REQUEST;
};
export type SignInReceiveAction = {
    type: typeof SIGN_IN_RECEIVE;
    payload: SignInResponse;
};
export type SignInErrorAction = {
    type: typeof SIGN_IN_ERROR;
    errorMessage?: string;
};

export type SignIn = SignInRequestAction | SignInReceiveAction | SignInErrorAction;

const userCookies = new UserCookies(900);

export const signIn = (signInDetails: SignInDetails) => async (dispatch: Dispatch<SignIn>) => {
    dispatch({ type: SIGN_IN_REQUEST });
    try {
        const data = await authApi.signIn(signInDetails);
        userCookies.setNewCookiesFromResponse(data);
        dispatch({ type: SIGN_IN_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: SIGN_IN_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: SIGN_IN_ERROR });
        }
    }
};
