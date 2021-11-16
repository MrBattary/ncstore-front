import { Dispatch } from 'redux';

import { GET_PERSON_PROFILE_ERROR, GET_PERSON_PROFILE_RECEIVE, GET_PERSON_PROFILE_REQUEST } from './userActionTypes';
import profileApi from '../../api/profile';
import { PersonProfile } from '../../types/PersonProfile';

export type GetPersonProfileRequestAction = {
    type: typeof GET_PERSON_PROFILE_REQUEST;
};
export type GetPersonProfileReceiveAction = {
    type: typeof GET_PERSON_PROFILE_RECEIVE;
    payload: PersonProfile;
};
export type GetPersonProfileErrorAction = {
    type: typeof GET_PERSON_PROFILE_ERROR;
    errorMessage?: string;
};

export type GetPersonProfile =
    | GetPersonProfileRequestAction
    | GetPersonProfileReceiveAction
    | GetPersonProfileErrorAction;

export const getPersonProfile = (token: string) => async (dispatch: Dispatch<GetPersonProfile>) => {
    dispatch({ type: GET_PERSON_PROFILE_REQUEST });
    try {
        const data = await profileApi.getPersonProfile(token);
        dispatch({ type: GET_PERSON_PROFILE_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: GET_PERSON_PROFILE_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: GET_PERSON_PROFILE_ERROR });
        }
    }
};
