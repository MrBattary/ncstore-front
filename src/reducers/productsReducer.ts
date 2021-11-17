import { ProductsList } from '../types/ProductsList';
import * as types from '../actions/products/productActionTypes';
import { GetProducts } from '../actions/products/GetProducts';
import { RestoreDefaultProductsReducer } from '../actions/products/RestoreDefaultProductsReducer';

interface ProductsStore {
    products: ProductsList;
    loading: boolean;
    success: boolean;
    errorMessage: string | null;
}

export type ProductsReducerTypes = GetProducts | RestoreDefaultProductsReducer;

const initialState: ProductsStore = {
    products: [],
    loading: false,
    success: false,
    errorMessage: null,
};

export const productsReducer = (state = initialState, action: ProductsReducerTypes): ProductsStore => {
    switch (action.type) {
        case types.GET_PRODUCTS_REQUEST: {
            return {
                ...state,
                loading: true,
                success: false,
                errorMessage: null,
            };
        }
        case types.GET_PRODUCTS_RECEIVE: {
            return {
                ...state,
                loading: false,
                success: true,
                products: action.payload ? action.payload : [],
            };
        }
        case types.GET_PRODUCTS_ERROR: {
            return {
                ...state,
                loading: false,
                success: false,
                errorMessage: action.errorMessage ? action.errorMessage : null,
            };
        }
        case types.RESTORE_DEFAULT_PRODUCTS_REDUCER: {
            return {
                ...state,
                products: [],
                success: false,
                errorMessage: null,
            };
        }
        default:
            return state;
    }
};
