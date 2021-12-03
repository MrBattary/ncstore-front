import { Dispatch } from 'redux';

import {
    UPDATE_PRODUCT_IN_CART_ERROR,
    UPDATE_PRODUCT_IN_CART_RECEIVE,
    UPDATE_PRODUCT_IN_CART_REQUEST,
} from './cartActionTypes';
import { CartProduct } from '../../types/CartProduct';
import { CartProductIdAndCount } from '../../types/CartProductIdAndCount';
import cartApi from '../../api/cart';

export type UpdateProductInCartRequestAction = {
    type: typeof UPDATE_PRODUCT_IN_CART_REQUEST;
};
export type UpdateProductInCartReceiveAction = {
    type: typeof UPDATE_PRODUCT_IN_CART_RECEIVE;
    payload: CartProduct;
};
export type UpdateProductInCartErrorAction = {
    type: typeof UPDATE_PRODUCT_IN_CART_ERROR;
    errorMessage?: string;
};

export type UpdateProductInCart =
    | UpdateProductInCartRequestAction
    | UpdateProductInCartReceiveAction
    | UpdateProductInCartErrorAction;

export const updateProductInCart =
    (cartProductIdAndCount: CartProductIdAndCount, token: string) =>
    async (dispatch: Dispatch<UpdateProductInCart>) => {
        dispatch({ type: UPDATE_PRODUCT_IN_CART_REQUEST });
        try {
            const data = await cartApi.updateProductInCart(cartProductIdAndCount, token);
            dispatch({ type: UPDATE_PRODUCT_IN_CART_RECEIVE, payload: data });
        } catch (e) {
            if (e instanceof Error) {
                dispatch({ type: UPDATE_PRODUCT_IN_CART_ERROR, errorMessage: e.message });
            } else {
                dispatch({ type: UPDATE_PRODUCT_IN_CART_ERROR });
            }
        }
    };
