import { Dispatch } from 'redux';

import { GET_PRODUCTS_ERROR, GET_PRODUCTS_RECEIVE, GET_PRODUCTS_REQUEST } from './productActionTypes';
import { Pagination } from '../../types/Pagination';

export type GetProductsRequestAction = {
    type: typeof GET_PRODUCTS_REQUEST;
};
export type GetProductsReceiveAction = {
    type: typeof GET_PRODUCTS_RECEIVE;
};
export type GetProductsErrorAction = {
    type: typeof GET_PRODUCTS_ERROR;
};

export type GetProducts = GetProductsRequestAction | GetProductsReceiveAction | GetProductsErrorAction;

export const getProducts = (pagination: Pagination) => async (dispatch: Dispatch<GetProducts>) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    try {
        dispatch({ type: GET_PRODUCTS_RECEIVE });
    } catch (e) {
        dispatch({ type: GET_PRODUCTS_ERROR });
    }
};
