import {Dispatch} from 'redux';

import {CHECKOUT_FROM_CART_ERROR, CHECKOUT_FROM_CART_RECEIVE, CHECKOUT_FROM_CART_REQUEST} from './orderActionTypes';
import cartApi from '../../api/cart';
import {Order} from '../../types/Order';
import {CartCheckout} from "../../types/CartCheckout";

export type CheckoutFromCartRequestAction = {
    type: typeof CHECKOUT_FROM_CART_REQUEST;
};
export type CheckoutFromCartReceiveAction = {
    type: typeof CHECKOUT_FROM_CART_RECEIVE;
    payload: Order;
};
export type CheckoutFromCartErrorAction = {
    type: typeof CHECKOUT_FROM_CART_ERROR;
    errorMessage?: string;
};

export type CheckoutFromCart =
    | CheckoutFromCartRequestAction
    | CheckoutFromCartReceiveAction
    | CheckoutFromCartErrorAction;

export const checkoutFromCart = (cartCheckout: CartCheckout, token: string) => async (dispatch: Dispatch<CheckoutFromCart>) => {
    dispatch({type: CHECKOUT_FROM_CART_REQUEST});
    try {
        // Using cart api because this request belongs to cart url
        const data = await cartApi.checkoutCart(cartCheckout, token);
        dispatch({type: CHECKOUT_FROM_CART_RECEIVE, payload: data});
    } catch (e) {
        if (e instanceof Error) {
            dispatch({type: CHECKOUT_FROM_CART_ERROR, errorMessage: e.message});
        } else {
            dispatch({type: CHECKOUT_FROM_CART_ERROR});
        }
    }
};
