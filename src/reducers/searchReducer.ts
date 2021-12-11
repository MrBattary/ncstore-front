import * as types from '../actions/search/searchActionTypes';
import { Pagination } from '../types/Pagination';
import { SortOrder, SortRule } from '../types/SortEnum';
import { SetNewCategoryNamesAction } from '../actions/search/SetNewCategoryNames';
import { SetNewSupplierIdAction } from '../actions/search/SetNewSupplierId';
import { SetNewPaginationAction } from '../actions/search/SetNewPagination';
import { SetNewSearchTextAction } from '../actions/search/SetNewSearchText';
import { SetNewSortOrderAction } from '../actions/search/SetNewSortOrder';
import { SetNewSortRuleAction } from '../actions/search/SetNewSortRule';
import { RestoreDefaultSearchReducerAction } from '../actions/search/RestoreDefaultSearchReducer';
import { buildQueryFromObject, combineUrls } from '../api/utilities';

interface SearchStore {
    categoryNames: Array<string>;
    searchText: string;
    supplierId: string;
    pagination: Pagination;
    sort: SortRule;
    sortOrder: SortOrder;
    searchUrl: string;
}

export type SearchReducerTypes =
    | SetNewCategoryNamesAction
    | SetNewSupplierIdAction
    | SetNewPaginationAction
    | SetNewSearchTextAction
    | SetNewSortOrderAction
    | SetNewSortRuleAction
    | RestoreDefaultSearchReducerAction;

const buildSearchUrl = (
    categoryNames: Array<string>,
    searchText: string,
    supplierId: string,
    pagination: Pagination,
    sort: SortRule,
    sortOrder: SortOrder
) =>
    combineUrls([
        '?',
        buildQueryFromObject({ categoryNames: categoryNames }),
        '&',
        buildQueryFromObject({ searchText: searchText }),
        '&',
        buildQueryFromObject({ supplierId: supplierId }),
        '&',
        buildQueryFromObject(pagination),
        '&',
        buildQueryFromObject({ sort: sort }),
        '&',
        buildQueryFromObject({ sortOrder: sortOrder }),
    ]);

const initialState: SearchStore = {
    categoryNames: [],
    searchText: '',
    supplierId: '',
    pagination: { page: 0, size: 10 },
    sort: SortRule.DEFAULT,
    sortOrder: SortOrder.ASC,
    searchUrl: buildSearchUrl([], '', '', { page: 0, size: 10 }, SortRule.DEFAULT, SortOrder.ASC),
};

export const searchReducer = (state = initialState, action: SearchReducerTypes): SearchStore => {
    switch (action.type) {
        case types.SET_NEW_CATEGORY_NAMES: {
            return {
                ...state,
                categoryNames: action.payload,
                searchUrl: buildSearchUrl(
                    action.payload,
                    state.searchText,
                    state.supplierId,
                    state.pagination,
                    state.sort,
                    state.sortOrder
                ),
            };
        }
        case types.SET_NEW_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.payload,
                searchUrl: buildSearchUrl(
                    state.categoryNames,
                    action.payload,
                    state.supplierId,
                    state.pagination,
                    state.sort,
                    state.sortOrder
                ),
            };
        }
        case types.SET_NEW_SUPPLIER_ID: {
            return {
                ...state,
                supplierId: action.payload,
                searchUrl: buildSearchUrl(
                    state.categoryNames,
                    state.searchText,
                    action.payload,
                    state.pagination,
                    state.sort,
                    state.sortOrder
                ),
            };
        }
        case types.SET_NEW_PAGINATION: {
            return {
                ...state,
                pagination: action.payload,
                searchUrl: buildSearchUrl(
                    state.categoryNames,
                    state.searchText,
                    state.supplierId,
                    action.payload,
                    state.sort,
                    state.sortOrder
                ),
            };
        }
        case types.SET_NEW_SORT_RULE: {
            return {
                ...state,
                sort: action.payload,
                searchUrl: buildSearchUrl(
                    state.categoryNames,
                    state.searchText,
                    state.supplierId,
                    state.pagination,
                    action.payload,
                    state.sortOrder
                ),
            };
        }
        case types.SET_NEW_SORT_ORDER: {
            return {
                ...state,
                sortOrder: action.payload,
                searchUrl: buildSearchUrl(
                    state.categoryNames,
                    state.searchText,
                    state.supplierId,
                    state.pagination,
                    state.sort,
                    action.payload
                ),
            };
        }
        case types.RESTORE_DEFAULT_SEARCH_REDUCER: {
            return {
                ...state,
                categoryNames: [],
                searchText: '',
                supplierId: '',
                pagination: { page: 0, size: 10 },
                sort: SortRule.DEFAULT,
                sortOrder: SortOrder.ASC,
                searchUrl: buildSearchUrl([], '', '', { page: 0, size: 10 }, SortRule.DEFAULT, SortOrder.ASC),
            };
        }
        default:
            return state;
    }
};
