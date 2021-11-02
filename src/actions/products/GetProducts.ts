import { Dispatch } from 'redux';

import productsApi from '../../api/products/products';
import { Pagination } from '../../types/Pagination';
import { GET_PRODUCTS_ERROR, GET_PRODUCTS_RECEIVE, GET_PRODUCTS_REQUEST } from './productActionTypes';
import { ProductsList } from '../../types/ProductsList';

export type GetProductsRequestAction = {
    type: typeof GET_PRODUCTS_REQUEST;
};
export type GetProductsReceiveAction = {
    type: typeof GET_PRODUCTS_RECEIVE;
    payload: ProductsList;
};
export type GetProductsErrorAction = {
    type: typeof GET_PRODUCTS_ERROR;
    errorMessage?: string;
};

export type GetProducts = GetProductsRequestAction | GetProductsReceiveAction | GetProductsErrorAction;

export const getProducts = (searchText: string, pagination: Pagination) => async (dispatch: Dispatch<GetProducts>) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    try {
        const data = await productsApi.getProducts(searchText, pagination);
        dispatch({ type: GET_PRODUCTS_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: GET_PRODUCTS_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: GET_PRODUCTS_ERROR });
        }
    }
};
