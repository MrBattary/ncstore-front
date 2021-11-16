import { Dispatch } from 'redux';

import { GET_COMPANY_PROFILE_ERROR, GET_COMPANY_PROFILE_RECEIVE, GET_COMPANY_PROFILE_REQUEST } from './userActionTypes';
import profileApi from '../../api/profile';
import { CompanyProfile } from '../../types/CompanyProfile';

export type GetCompanyProfileRequestAction = {
    type: typeof GET_COMPANY_PROFILE_REQUEST;
};
export type GetCompanyProfileReceiveAction = {
    type: typeof GET_COMPANY_PROFILE_RECEIVE;
    payload: CompanyProfile;
};
export type GetCompanyProfileErrorAction = {
    type: typeof GET_COMPANY_PROFILE_ERROR;
    errorMessage?: string;
};

export type GetCompanyProfile =
    | GetCompanyProfileRequestAction
    | GetCompanyProfileReceiveAction
    | GetCompanyProfileErrorAction;

export const getCompanyProfile = (token: string) => async (dispatch: Dispatch<GetCompanyProfile>) => {
    dispatch({ type: GET_COMPANY_PROFILE_REQUEST });
    try {
        const data = await profileApi.getCompanyProfile();
        dispatch({ type: GET_COMPANY_PROFILE_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: GET_COMPANY_PROFILE_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: GET_COMPANY_PROFILE_ERROR });
        }
    }
};
