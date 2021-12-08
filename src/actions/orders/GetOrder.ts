import { Dispatch } from 'redux';

import { GET_ORDER_ERROR, GET_ORDER_RECEIVE, GET_ORDER_REQUEST } from './orderActionTypes';
import { Order } from '../../types/Order';
import ordersApi from '../../api/orders';

export type GetOrderRequestAction = {
    type: typeof GET_ORDER_REQUEST;
};
export type GetOrderReceiveAction = {
    type: typeof GET_ORDER_RECEIVE;
    payload: Order;
};
export type GetOrderErrorAction = {
    type: typeof GET_ORDER_ERROR;
    errorMessage?: string;
};

export type GetOrder = GetOrderRequestAction | GetOrderReceiveAction | GetOrderErrorAction;

export const getOrder = (orderId: string, token: string) => async (dispatch: Dispatch<GetOrder>) => {
    dispatch({ type: GET_ORDER_REQUEST });
    try {
        const data = await ordersApi.getOrder(orderId, token);
        dispatch({ type: GET_ORDER_RECEIVE, payload: data });
    } catch (e) {
        if (e instanceof Error) {
            dispatch({ type: GET_ORDER_ERROR, errorMessage: e.message });
        } else {
            dispatch({ type: GET_ORDER_ERROR });
        }
    }
};
