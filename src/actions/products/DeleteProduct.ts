import { Dispatch } from 'redux';

import { DELETE_PRODUCT_ERROR, DELETE_PRODUCT_RECEIVE, DELETE_PRODUCT_REQUEST } from './productActionTypes';
import productsApi from '../../api/products';
import { Product } from '../../types/Product';

export type DeleteProductRequestAction = {
    type: typeof DELETE_PRODUCT_REQUEST;
};
export type DeleteProductReceiveAction = {
    type: typeof DELETE_PRODUCT_RECEIVE;
    payload: Product;
};
export type DeleteProductErrorAction = {
    type: typeof DELETE_PRODUCT_ERROR;
    errorMessage?: string;
};

export type DeleteProduct = DeleteProductRequestAction | DeleteProductReceiveAction | DeleteProductErrorAction;

export const deleteProduct = (productId: string, token: string) => async (dispatch: Dispatch<DeleteProduct>) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
        const data = await productsApi.deleteProduct(productId, token);
        dispatch({ type: DELETE_PRODUCT_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: DELETE_PRODUCT_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: DELETE_PRODUCT_ERROR });
        }
    }
};
