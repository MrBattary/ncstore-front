import * as types from '../actions/cart/cartActionTypes';
import { Cart } from '../types/Cart';
import { CartProduct } from '../types/CartProduct';
import { GetCart } from '../actions/cart/GetCart';
import { UpdateItemInCart } from '../actions/cart/UpdateItemInCart';
import { DeleteItemFromCart } from '../actions/cart/DeleteItemFromCart';

interface CartStore {
    cart: Cart;
    cartProduct: CartProduct | null;
    loading: boolean;
    success: boolean;
    errorMessage: string | null;
}

export type CartReducerTypes = GetCart | UpdateItemInCart | DeleteItemFromCart;

const initialState: CartStore = {
    cart: [],
    cartProduct: null,
    loading: false,
    success: false,
    errorMessage: null,
};

export const cartReducer = (state = initialState, action: CartReducerTypes): CartStore => {
    switch (action.type) {
        case types.GET_CART_REQUEST: {
            return {
                ...state,
                loading: true,
                success: false,
                errorMessage: null,
            };
        }
        case types.DELETE_ITEM_FROM_CART_REQUEST:
        case types.UPDATE_ITEM_IN_CART_REQUEST: {
            return {
                ...state,
                cartProduct: null,
                loading: true,
                success: false,
                errorMessage: null,
            };
        }
        case types.GET_CART_RECEIVE: {
            return {
                ...state,
                cart: action.payload,
                loading: false,
                success: true,
            };
        }
        case types.DELETE_ITEM_FROM_CART_RECEIVE:
        case types.UPDATE_ITEM_IN_CART_RECEIVE: {
            return {
                ...state,
                cartProduct: action.payload ? action.payload : null,
                loading: false,
                success: true,
            };
        }
        case types.DELETE_ITEM_FROM_CART_ERROR:
        case types.UPDATE_ITEM_IN_CART_ERROR:
        case types.GET_CART_ERROR: {
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
