import {Dispatch} from 'redux';

import {GET_CATEGORIES_ERROR, GET_CATEGORIES_RECEIVE, GET_CATEGORIES_REQUEST} from "./categoryActionTypes";
import {CategoriesList} from "../../types/CategoriesGet";
import categoryApi from "../../api/category";

export type GetCategoriesRequestAction = {
    type: typeof GET_CATEGORIES_REQUEST;
};
export type GetCategoriesReceiveAction = {
    type: typeof GET_CATEGORIES_RECEIVE;
    payload: CategoriesList;
};
export type GetCategoriesErrorAction = {
    type: typeof GET_CATEGORIES_ERROR;
    errorMessage?: string;
};

export type GetCategories = GetCategoriesRequestAction | GetCategoriesReceiveAction | GetCategoriesErrorAction;

export const getCategories = () =>
        async (dispatch: Dispatch<GetCategories>) => {
            dispatch({ type: GET_CATEGORIES_REQUEST });
            try {
                const data = await categoryApi.getCategories();
                dispatch({ type: GET_CATEGORIES_RECEIVE, payload: data });
            } catch (e) {
                if (e instanceof Error) {
                    dispatch({ type: GET_CATEGORIES_ERROR, errorMessage: e.message });
                } else {
                    dispatch({ type: GET_CATEGORIES_ERROR });
                }
            }
        };