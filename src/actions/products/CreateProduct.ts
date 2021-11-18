import { Dispatch } from 'redux';

import { NEW_PRODUCT_ERROR, NEW_PRODUCT_RECEIVE, NEW_PRODUCT_REQUEST } from './productActionTypes';
import { Product } from '../../types/Product';
import productsApi from '../../api/products';

export type NewProductRequest = {
    type: typeof NEW_PRODUCT_REQUEST;
};
export type NewProductReceive = {
    type: typeof NEW_PRODUCT_RECEIVE;
    payload: Product;
};
export type NewProductError = {
    type: typeof NEW_PRODUCT_ERROR;
    errorMessage?: string;
};

export type NewProduct = NewProductRequest | NewProductReceive | NewProductError;

export const newProduct = (product: Product, token: string) => async (dispatch: Dispatch<NewProduct>) => {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    try {
        const data = await productsApi.newProduct(product, token);
        dispatch({ type: NEW_PRODUCT_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: NEW_PRODUCT_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: NEW_PRODUCT_ERROR });
        }
    }
};
