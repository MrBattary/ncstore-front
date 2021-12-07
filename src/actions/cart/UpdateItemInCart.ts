import { Dispatch } from 'redux';

import { UPDATE_ITEM_IN_CART_ERROR, UPDATE_ITEM_IN_CART_RECEIVE, UPDATE_ITEM_IN_CART_REQUEST } from './cartActionTypes';
import { CartProduct } from '../../types/CartProduct';
import { CartProductIdAndCount } from '../../types/CartProductIdAndCount';
import cartApi from '../../api/cart';

export type UpdateItemInCartRequestAction = {
    type: typeof UPDATE_ITEM_IN_CART_REQUEST;
};
export type UpdateItemInCartReceiveAction = {
    type: typeof UPDATE_ITEM_IN_CART_RECEIVE;
    payload: CartProduct;
};
export type UpdateItemInCartErrorAction = {
    type: typeof UPDATE_ITEM_IN_CART_ERROR;
    errorMessage?: string;
};

export type UpdateItemInCart =
    | UpdateItemInCartRequestAction
    | UpdateItemInCartReceiveAction
    | UpdateItemInCartErrorAction;

export const updateItemInCart =
    (cartProductIdAndCount: CartProductIdAndCount, token: string) => async (dispatch: Dispatch<UpdateItemInCart>) => {
        dispatch({ type: UPDATE_ITEM_IN_CART_REQUEST });
        try {
            const data = await cartApi.updateItemInCart(cartProductIdAndCount, token);
            dispatch({ type: UPDATE_ITEM_IN_CART_RECEIVE, payload: data });
        } catch (e) {
            if (e instanceof Error) {
                dispatch({ type: UPDATE_ITEM_IN_CART_ERROR, errorMessage: e.message });
            } else {
                dispatch({ type: UPDATE_ITEM_IN_CART_ERROR });
            }
        }
    };
