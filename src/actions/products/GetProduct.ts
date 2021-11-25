import { Dispatch } from 'redux';

import { GET_PRODUCT_ERROR, GET_PRODUCT_RECEIVE, GET_PRODUCT_REQUEST } from './productActionTypes';
import productsApi from '../../api/products';
import { DetailedProduct } from '../../types/DetailedProduct';

export type GetProductRequestAction = {
    type: typeof GET_PRODUCT_REQUEST;
};
export type GetProductReceiveAction = {
    type: typeof GET_PRODUCT_RECEIVE;
    payload: DetailedProduct;
};
export type GetProductErrorAction = {
    type: typeof GET_PRODUCT_ERROR;
    errorMessage?: string;
};

export type GetProduct = GetProductRequestAction | GetProductReceiveAction | GetProductErrorAction;

export const getProduct = (productId: string) => async (dispatch: Dispatch<GetProduct>) => {
    dispatch({ type: GET_PRODUCT_REQUEST });
    try {
        const data = await productsApi.getProduct(productId);
        dispatch({ type: GET_PRODUCT_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: GET_PRODUCT_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: GET_PRODUCT_ERROR });
        }
    }
};
