import { Dispatch } from 'redux';

import { SET_NEW_PAGINATION } from './searchActionTypes';
import { Pagination } from '../../types/Pagination';

export type SetNewPaginationAction = {
    type: typeof SET_NEW_PAGINATION;
    payload: Pagination;
};

export const setNewPagination = (newPagination: Pagination) => (dispatch: Dispatch<SetNewPaginationAction>) => {
    dispatch({ type: SET_NEW_PAGINATION, payload: newPagination });
};
