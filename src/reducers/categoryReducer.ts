import * as types from '../actions/category/categoryActionTypes';
import {GetCategories} from "../actions/category/GetCategories";
import {CategoriesList} from "../types/CategoriesGet";

interface CategoryStore {
    categories: CategoriesList;
    loading: boolean;
    success: boolean;
    errorMessage: string | null;
}

export type CategoryReducerTypes = GetCategories;

const initialState: CategoryStore = {
    categories: [],
    loading: false,
    success: false,
    errorMessage: null,
};

export const categoryReducer = (state = initialState, action: CategoryReducerTypes): CategoryStore => {
    switch (action.type) {
        case types.GET_CATEGORIES_REQUEST: {
            return {
                ...state,
                loading: true,
                success: false,
                errorMessage: null,
            };
        }
        case types.GET_CATEGORIES_RECEIVE: {
            return {
                ...state,
                categories: action.payload,
                loading: false,
                success: true,
            };
        }
        case types.GET_CATEGORIES_ERROR: {
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
