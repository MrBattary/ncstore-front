import { Dispatch } from 'redux';

import { SET_NEW_SORT_RULE } from './searchActionTypes';
import { SortRule } from '../../types/SortEnum';

export type SetNewSortRuleAction = {
    type: typeof SET_NEW_SORT_RULE;
    payload: SortRule;
};

export const setNewSortRule = (newSortRule: SortRule) => (dispatch: Dispatch<SetNewSortRuleAction>) => {
    dispatch({ type: SET_NEW_SORT_RULE, payload: newSortRule });
};
