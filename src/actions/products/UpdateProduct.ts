import { Dispatch } from 'redux';
import { UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_RECEIVE, UPDATE_PRODUCT_REQUEST } from './productActionTypes';
import productsApi from '../../api/products';
import { Product } from '../../types/Product';

export type UpdateProductRequestAction = {
    type: typeof UPDATE_PRODUCT_REQUEST;
};

export type UpdateProductReceiveAction = {
    type: typeof UPDATE_PRODUCT_RECEIVE;
    payload: Product;
};

export type UpdateProductErrorAction = {
    type: typeof UPDATE_PRODUCT_ERROR;
    errorMessage?: string;
};

export type UpdateProduct = UpdateProductRequestAction | UpdateProductReceiveAction | UpdateProductErrorAction;

export const updateProduct = (product: Product, token: string) => async (dispatch: Dispatch<UpdateProduct>) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
        const data = await productsApi.updateProduct(product, token);
        dispatch({ type: UPDATE_PRODUCT_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: UPDATE_PRODUCT_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: UPDATE_PRODUCT_ERROR });
        }
    }
};
