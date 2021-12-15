import { Dispatch } from 'redux';

import { SET_NEW_CATEGORY_NAMES } from './searchActionTypes';

export type SetNewCategoryNamesAction = {
    type: typeof SET_NEW_CATEGORY_NAMES;
    payload: Array<string>;
};

export const setNewCategoriesNames =
    (newCategories: Array<string>) => (dispatch: Dispatch<SetNewCategoryNamesAction>) => {
        dispatch({ type: SET_NEW_CATEGORY_NAMES, payload: newCategories });
    };
