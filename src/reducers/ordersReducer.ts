import * as types from '../actions/orders/orderActionTypes';
import { Order } from '../types/Order';
import { CheckoutFromCart } from '../actions/orders/CheckoutFromCart';

interface OrdersStore {
    order: Order | null;
    loading: boolean;
    success: boolean;
    errorMessage: string | null;
}

export type OrdersReducerTypes = CheckoutFromCart;

const initialState: OrdersStore = {
    order: null,
    loading: false,
    success: false,
    errorMessage: null,
};

export const ordersReducer = (state = initialState, action: OrdersReducerTypes): OrdersStore => {
    switch (action.type) {
        case types.CHECKOUT_FROM_CART_REQUEST: {
            return {
                ...state,
                order: null,
                loading: true,
                success: false,
                errorMessage: null,
            };
        }
        case types.CHECKOUT_FROM_CART_RECEIVE: {
            return {
                ...state,
                order: action.payload,
                loading: false,
                success: true,
            };
        }
        case types.CHECKOUT_FROM_CART_ERROR: {
            return {
                ...state,
                loading: false,
                success: false,
                errorMessage: action.errorMessage ? action.errorMessage : null,
            };
        }
        default:
            return state;
    }
};
