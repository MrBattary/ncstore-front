import * as types from '../actions/products/productActionTypes';
import { ProductsList } from '../types/ProductsList';
import { GetProducts } from '../actions/products/GetProducts';
import { RestoreDefaultProductsReducer } from '../actions/products/RestoreDefaultProductsReducer';
import { NewProduct } from '../actions/products/CreateProduct';
import { GetProduct } from '../actions/products/GetProduct';
import { ProductWithSupplier } from '../types/ProductWithSupplier';
import { DeleteProduct } from '../actions/products/DeleteProduct';
import { GetDetailedProduct } from '../actions/products/GetDetailedProduct';
import { Product } from '../types/Product';
import { UpdateProduct } from '../actions/products/UpdateProduct';
import { ProductForSale } from '../types/ProductForSale';

interface ProductsStore {
    detailedProduct: ProductWithSupplier | null;
    productForSale: ProductForSale | null;
    product: Product | null;
    products: ProductsList;
    loading: boolean;
    success: boolean;
    errorMessage: string | null;
}

export type ProductsReducerTypes =
    | GetProducts
    | NewProduct
    | GetProduct
    | GetDetailedProduct
    | UpdateProduct
    | DeleteProduct
    | RestoreDefaultProductsReducer;

const initialState: ProductsStore = {
    detailedProduct: null,
    productForSale: null,
    product: null,
    products: [],
    loading: false,
    success: false,
    errorMessage: null,
};

export const productsReducer = (state = initialState, action: ProductsReducerTypes): ProductsStore => {
    switch (action.type) {
        case types.DELETE_PRODUCT_REQUEST:
        case types.NEW_PRODUCT_REQUEST:
        case types.GET_PRODUCT_REQUEST:
        case types.GET_PRODUCTS_REQUEST: {
            return {
                ...state,
                loading: true,
                success: false,
                errorMessage: null,
            };
        }
        case types.GET_DETAILED_PRODUCT_REQUEST: {
            return {
                ...state,
                detailedProduct: null,
                loading: true,
                success: false,
                errorMessage: null,
            };
        }
        case types.UPDATE_PRODUCT_REQUEST: {
            return {
                ...state,
                product: null,
                detailedProduct: null,
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
        case types.GET_DETAILED_PRODUCT_RECEIVE: {
            return {
                ...state,
                loading: false,
                success: true,
                detailedProduct: action.payload ? action.payload : null,
            };
        }
        case types.GET_PRODUCT_RECEIVE: {
            return {
                ...state,
                loading: false,
                success: true,
                productForSale: action.payload ? action.payload : null,
            };
        }
        case types.UPDATE_PRODUCT_RECEIVE:
        case types.DELETE_PRODUCT_RECEIVE:
        case types.NEW_PRODUCT_RECEIVE: {
            return {
                ...state,
                loading: false,
                success: true,
                product: action.payload ? action.payload : null,
            };
        }
        case types.UPDATE_PRODUCT_ERROR:
        case types.DELETE_PRODUCT_ERROR:
        case types.NEW_PRODUCT_ERROR:
        case types.GET_PRODUCT_ERROR:
        case types.GET_DETAILED_PRODUCT_ERROR:
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
                detailedProduct: null,
                product: null,
                products: [],
                success: false,
                errorMessage: null,
            };
        }
        default:
            return state;
    }
};
