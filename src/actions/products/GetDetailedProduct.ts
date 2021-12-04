import { Dispatch } from 'redux';

import {
    GET_DETAILED_PRODUCT_ERROR,
    GET_DETAILED_PRODUCT_RECEIVE,
    GET_DETAILED_PRODUCT_REQUEST,
} from './productActionTypes';
import { ProductWithSupplier } from '../../types/ProductWithSupplier';
import productsApi from '../../api/products';

export type GetDetailedProductRequestAction = {
    type: typeof GET_DETAILED_PRODUCT_REQUEST;
};
export type GetDetailedProductReceiveAction = {
    type: typeof GET_DETAILED_PRODUCT_RECEIVE;
    payload: ProductWithSupplier;
};
export type GetDetailedProductErrorAction = {
    type: typeof GET_DETAILED_PRODUCT_ERROR;
    errorMessage?: string;
};

export type GetDetailedProduct =
    | GetDetailedProductRequestAction
    | GetDetailedProductReceiveAction
    | GetDetailedProductErrorAction;

export const getDetailedProduct =
    (productId: string, token: string) => async (dispatch: Dispatch<GetDetailedProduct>) => {
        dispatch({ type: GET_DETAILED_PRODUCT_REQUEST });
        try {
            const data = await productsApi.getDetailedProduct(productId, token);
            dispatch({ type: GET_DETAILED_PRODUCT_RECEIVE, payload: data });
        } catch (e) {
            if (e instanceof Error) {
                dispatch({ type: GET_DETAILED_PRODUCT_ERROR, errorMessage: e.message });
            } else {
                dispatch({ type: GET_DETAILED_PRODUCT_ERROR });
            }
        }
    };
