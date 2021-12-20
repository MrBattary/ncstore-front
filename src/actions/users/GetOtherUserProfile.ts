import { Dispatch } from 'redux';

import {
    GET_OTHER_USER_PROFILE_ERROR,
    GET_OTHER_USER_PROFILE_RECEIVE,
    GET_OTHER_USER_PROFILE_REQUEST,
} from './userActionTypes';
import profileApi from '../../api/profile';
import { PersonProfile } from '../../types/PersonProfile';
import { CompanyProfile } from '../../types/CompanyProfile';

export type GetOtherUserProfileRequestAction = {
    type: typeof GET_OTHER_USER_PROFILE_REQUEST;
};
export type GetOtherUserProfileReceiveAction = {
    type: typeof GET_OTHER_USER_PROFILE_RECEIVE;
    payload: CompanyProfile | PersonProfile;
};
export type GetOtherUserProfileErrorAction = {
    type: typeof GET_OTHER_USER_PROFILE_ERROR;
    errorMessage?: string;
};

export type GetOtherUserProfile =
    | GetOtherUserProfileRequestAction
    | GetOtherUserProfileReceiveAction
    | GetOtherUserProfileErrorAction;

export const getOtherUserProfile = (userId: string) => async (dispatch: Dispatch<GetOtherUserProfile>) => {
    dispatch({ type: GET_OTHER_USER_PROFILE_REQUEST });
    try {
        const data = await profileApi.getOtherCompanyProfile(userId);
        dispatch({ type: GET_OTHER_USER_PROFILE_RECEIVE, payload: data });
    } catch (e) {
        //it means our user is not company? so we can do this:
        try {
            const data = await profileApi.getOtherPersonProfile(userId);
            dispatch({ type: GET_OTHER_USER_PROFILE_RECEIVE, payload: data });
        } catch (e) {
            if (e instanceof Error) {
                dispatch({ type: GET_OTHER_USER_PROFILE_ERROR, errorMessage: e.message });
            } else {
                dispatch({ type: GET_OTHER_USER_PROFILE_ERROR });
            }
        }
    }
};
