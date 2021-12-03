import * as types from '../actions/orders/orderActionTypes';
import { Order } from '../types/Order';
import { SetOrder } from '../actions/orders/SetOrder';

interface OrdersStore {
    order: Order | null;
    loading: boolean;
    success: boolean;
    errorMessage: string | null;
}

export type OrdersReducerTypes = SetOrder;

const initialState: OrdersStore = {
    order: null,
    loading: false,
    success: false,
    errorMessage: null,
};

export const ordersReducer = (state = initialState, action: OrdersReducerTypes): OrdersStore => {
    switch (action.type) {
        case types.SET_ORDER: {
            return {
                ...state,
                order: action.payload,
                loading: false,
                success: true,
            };
        }
        default:
            return state;
    }
};
