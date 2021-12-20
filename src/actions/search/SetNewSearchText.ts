import { Dispatch } from 'redux';

import { SET_NEW_SEARCH_TEXT } from './searchActionTypes';

export type SetNewSearchTextAction = {
    type: typeof SET_NEW_SEARCH_TEXT;
    payload: string;
};

export const setNewSearchText = (newSearchText: string) => (dispatch: Dispatch<SetNewSearchTextAction>) => {
    dispatch({ type: SET_NEW_SEARCH_TEXT, payload: newSearchText });
};
