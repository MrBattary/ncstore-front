import { Dispatch } from 'redux';

import { GET_CART_ERROR, GET_CART_RECEIVE, GET_CART_REQUEST } from './cartActionTypes';
import { Cart } from '../../types/Cart';
import cartApi from '../../api/cart';

export type GetCartRequestAction = {
    type: typeof GET_CART_REQUEST;
};
export type GetCartReceiveAction = {
    type: typeof GET_CART_RECEIVE;
    payload: Cart;
};
export type GetCartErrorAction = {
    type: typeof GET_CART_ERROR;
    errorMessage?: string;
};

export type GetCart = GetCartRequestAction | GetCartReceiveAction | GetCartErrorAction;

export const getCart = (token: string) => async (dispatch: Dispatch<GetCart>) => {
    dispatch({ type: GET_CART_REQUEST });
    try {
        const data = await cartApi.getCart(token);
        dispatch({ type: GET_CART_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: GET_CART_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: GET_CART_ERROR });
        }
    }
};
