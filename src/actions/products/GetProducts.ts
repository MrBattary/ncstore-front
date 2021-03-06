import { Dispatch } from 'redux';

import productsApi from '../../api/products';
import { GET_PRODUCTS_ERROR, GET_PRODUCTS_RECEIVE, GET_PRODUCTS_REQUEST } from './productActionTypes';
import { ProductsList } from '../../types/ProductsList';
import { SearchQuery } from '../../types/SearchQuery';

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

export const getProducts = (searchQuery: SearchQuery) => async (dispatch: Dispatch<GetProducts>) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    try {
        const data = await productsApi.getProducts(searchQuery);
        dispatch({ type: GET_PRODUCTS_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: GET_PRODUCTS_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: GET_PRODUCTS_ERROR });
        }
    }
};

export const getProductsFromSearch = (search: string) => async (dispatch: Dispatch<GetProducts>) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    try {
        const data = await productsApi.getProductsFromSearch(search);
        dispatch({ type: GET_PRODUCTS_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: GET_PRODUCTS_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: GET_PRODUCTS_ERROR });
        }
    }
};
