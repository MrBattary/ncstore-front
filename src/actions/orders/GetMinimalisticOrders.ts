import { Dispatch } from 'redux';

import {
    GET_MINIMALISTIC_ORDERS_ERROR,
    GET_MINIMALISTIC_ORDERS_RECEIVE,
    GET_MINIMALISTIC_ORDERS_REQUEST,
} from './orderActionTypes';
import { Orders } from '../../types/Orders';
import { Pagination } from '../../types/Pagination';
import ordersApi from '../../api/orders';

export type GetMinimalisticOrdersRequestAction = {
    type: typeof GET_MINIMALISTIC_ORDERS_REQUEST;
};
export type GetMinimalisticOrdersReceiveAction = {
    type: typeof GET_MINIMALISTIC_ORDERS_RECEIVE;
    payload: Orders;
};
export type GetMinimalisticOrdersErrorAction = {
    type: typeof GET_MINIMALISTIC_ORDERS_ERROR;
    errorMessage?: string;
};

export type GetMinimalisticOrders =
    | GetMinimalisticOrdersRequestAction
    | GetMinimalisticOrdersReceiveAction
    | GetMinimalisticOrdersErrorAction;

export const getMinimalisticOrders =
    (pagination: Pagination, token: string) => async (dispatch: Dispatch<GetMinimalisticOrders>) => {
        dispatch({ type: GET_MINIMALISTIC_ORDERS_REQUEST });
        try {
            const data = await ordersApi.getMinimalisticOrders(pagination, token);
            dispatch({ type: GET_MINIMALISTIC_ORDERS_RECEIVE, payload: data });
        } catch (e) {
            if (e instanceof Error) {
                dispatch({ type: GET_MINIMALISTIC_ORDERS_ERROR, errorMessage: e.message });
            } else {
                dispatch({ type: GET_MINIMALISTIC_ORDERS_ERROR });
            }
        }
    };
