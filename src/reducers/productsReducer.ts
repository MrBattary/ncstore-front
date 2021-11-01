import { ProductsList } from '../types/ProductsList';
import * as types from '../actions/products/productActionTypes';
import { GetProducts } from '../actions/products/GetProducts';

interface ProductsStore {
    products: ProductsList;
    loading: boolean;
    errorMessage: string | null;
}

export type ProductsReducerTypes = GetProducts;

const initialState: ProductsStore = {
    products: [],
    loading: false,
    errorMessage: null,
};

export const productsReducer = (state = initialState, action: ProductsReducerTypes): ProductsStore => {
    switch (action.type) {
        case types.GET_PRODUCTS_REQUEST: {
            return {
                ...state,
                loading: true,
                errorMessage: null,
            };
        }
        case types.GET_PRODUCTS_RECEIVE: {
            return {
                ...state,
                loading: false,
                products: action.payload ? action.payload : [],
            };
        }
        case types.GET_PRODUCTS_ERROR: {
            return {
                ...state,
                loading: false,
                errorMessage: action.errorMessage ? action.errorMessage : null,
            };
        }
    }
};
