import * as types from '../actions/orders/orderActionTypes';
import { Order } from '../types/Order';
import { CheckoutFromCart } from '../actions/orders/CheckoutFromCart';
import { GetMinimalisticOrders } from '../actions/orders/GetMinimalisticOrders';
import { GetOrder } from '../actions/orders/GetOrder';
import { Orders } from '../types/Orders';

interface OrdersStore {
    minimalisticOrders: Orders | [];
    order: Order | null;
    loading: boolean;
    success: boolean;
    errorMessage: string | null;
}

export type OrdersReducerTypes = CheckoutFromCart | GetMinimalisticOrders | GetOrder;

const initialState: OrdersStore = {
    minimalisticOrders: [],
    order: null,
    loading: false,
    success: false,
    errorMessage: null,
};

export const ordersReducer = (state = initialState, action: OrdersReducerTypes): OrdersStore => {
    switch (action.type) {
        case types.GET_ORDER_REQUEST:
        case types.CHECKOUT_FROM_CART_REQUEST: {
            return {
                ...state,
                order: null,
                loading: true,
                success: false,
                errorMessage: null,
            };
        }
        case types.GET_MINIMALISTIC_ORDERS_REQUEST: {
            return {
                ...state,
                minimalisticOrders: [],
                loading: true,
                success: false,
                errorMessage: null,
            };
        }
        case types.GET_ORDER_RECEIVE:
        case types.CHECKOUT_FROM_CART_RECEIVE: {
            return {
                ...state,
                order: action.payload,
                loading: false,
                success: true,
            };
        }
        case types.GET_MINIMALISTIC_ORDERS_RECEIVE: {
            return {
                ...state,
                minimalisticOrders: action.payload,
                loading: false,
                success: true,
            };
        }
        case types.GET_ORDER_ERROR:
        case types.GET_MINIMALISTIC_ORDERS_ERROR:
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
