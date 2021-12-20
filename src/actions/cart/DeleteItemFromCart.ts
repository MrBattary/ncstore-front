import { Dispatch } from 'redux';

import {
    DELETE_ITEM_FROM_CART_ERROR,
    DELETE_ITEM_FROM_CART_RECEIVE,
    DELETE_ITEM_FROM_CART_REQUEST,
} from './cartActionTypes';
import { CartProduct } from '../../types/CartProduct';
import cartApi from '../../api/cart';

export type DeleteItemFromCartRequestAction = {
    type: typeof DELETE_ITEM_FROM_CART_REQUEST;
};
export type DeleteItemFromCartReceiveAction = {
    type: typeof DELETE_ITEM_FROM_CART_RECEIVE;
    payload: CartProduct | null;
};
export type DeleteItemFromCartErrorAction = {
    type: typeof DELETE_ITEM_FROM_CART_ERROR;
    errorMessage?: string;
};

export type DeleteItemFromCart =
    | DeleteItemFromCartRequestAction
    | DeleteItemFromCartReceiveAction
    | DeleteItemFromCartErrorAction;

export const deleteItemFromCart =
    (productId: string, token: string) => async (dispatch: Dispatch<DeleteItemFromCart>) => {
        dispatch({ type: DELETE_ITEM_FROM_CART_REQUEST });
        try {
            const data = await cartApi.deleteItemFromCart(productId, token);
            dispatch({ type: DELETE_ITEM_FROM_CART_RECEIVE, payload: data ? data : null });
        } catch (e) {
            if (e instanceof Error) {
                dispatch({ type: DELETE_ITEM_FROM_CART_ERROR, errorMessage: e.message });
            } else {
                dispatch({ type: DELETE_ITEM_FROM_CART_ERROR });
            }
        }
    };
