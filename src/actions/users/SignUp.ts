import { Dispatch } from 'redux';

import { SIGN_UP_REQUEST, SIGN_UP_RECEIVE, SIGN_UP_ERROR } from './userActionTypes';
import authApi from '../../api/auth';
import { CompanySignUpDetails, PersonSignUpDetails } from '../../types/SignUpDetails';

export type SignUpRequestAction = {
    type: typeof SIGN_UP_REQUEST;
};
export type SignUpReceiveAction = {
    type: typeof SIGN_UP_RECEIVE;
};
export type SignUpErrorAction = {
    type: typeof SIGN_UP_ERROR;
    errorMessage?: string;
};

export type SignUp = SignUpRequestAction | SignUpReceiveAction | SignUpErrorAction;

export const signUpCompany = (companySignUpDetails: CompanySignUpDetails) => async (dispatch: Dispatch<SignUp>) => {
    dispatch({ type: SIGN_UP_REQUEST });
    try {
        await authApi.signUpCompany(companySignUpDetails);
        dispatch({ type: SIGN_UP_RECEIVE });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: SIGN_UP_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: SIGN_UP_ERROR });
        }
    }
};

export const signUpPerson = (personSignUpDetails: PersonSignUpDetails) => async (dispatch: Dispatch<SignUp>) => {
    dispatch({ type: SIGN_UP_REQUEST });
    try {
        await authApi.signUpPerson(personSignUpDetails);
        dispatch({ type: SIGN_UP_RECEIVE });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: SIGN_UP_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: SIGN_UP_ERROR });
        }
    }
};
