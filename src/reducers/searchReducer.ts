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
import { SearchQuery } from '../types/SearchQuery';
import { InitDefaultSearchReducerAction } from '../actions/search/InitDefaultSearchReducer';

interface SearchStore {
    searchQuery: SearchQuery;
    searchUrl: string;
    initialized: boolean;
}

export type SearchReducerTypes =
    | SetNewCategoryNamesAction
    | SetNewSupplierIdAction
    | SetNewPaginationAction
    | SetNewSearchTextAction
    | SetNewSortOrderAction
    | SetNewSortRuleAction
    | RestoreDefaultSearchReducerAction
    | InitDefaultSearchReducerAction;

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
        buildQueryFromObject({ categoryNames: categoryNames.join('|') }),
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
    searchQuery: {
        categoryNames: [],
        searchText: '',
        supplierId: '',
        pagination: { page: 0, size: 10 },
        sortRule: SortRule.DEFAULT,
        sortOrder: SortOrder.ASC,
    },
    searchUrl: buildSearchUrl([], '', '', { page: 0, size: 10 }, SortRule.DEFAULT, SortOrder.ASC),
    initialized: false,
};

export const searchReducer = (state = initialState, action: SearchReducerTypes): SearchStore => {
    switch (action.type) {
        case types.SET_NEW_CATEGORY_NAMES: {
            return {
                ...state,
                searchQuery: { ...state.searchQuery, categoryNames: action.payload },
                searchUrl: buildSearchUrl(
                    action.payload,
                    state.searchQuery.searchText,
                    state.searchQuery.supplierId,
                    state.searchQuery.pagination,
                    state.searchQuery.sortRule,
                    state.searchQuery.sortOrder
                ),
            };
        }
        case types.SET_NEW_SEARCH_TEXT: {
            return {
                ...state,
                searchQuery: { ...state.searchQuery, searchText: action.payload },
                searchUrl: buildSearchUrl(
                    state.searchQuery.categoryNames,
                    action.payload,
                    state.searchQuery.supplierId,
                    state.searchQuery.pagination,
                    state.searchQuery.sortRule,
                    state.searchQuery.sortOrder
                ),
            };
        }
        case types.SET_NEW_SUPPLIER_ID: {
            return {
                ...state,
                searchQuery: { ...state.searchQuery, supplierId: action.payload },
                searchUrl: buildSearchUrl(
                    state.searchQuery.categoryNames,
                    state.searchQuery.searchText,
                    action.payload,
                    state.searchQuery.pagination,
                    state.searchQuery.sortRule,
                    state.searchQuery.sortOrder
                ),
            };
        }
        case types.SET_NEW_PAGINATION: {
            return {
                ...state,
                searchQuery: { ...state.searchQuery, pagination: action.payload },
                searchUrl: buildSearchUrl(
                    state.searchQuery.categoryNames,
                    state.searchQuery.searchText,
                    state.searchQuery.supplierId,
                    action.payload,
                    state.searchQuery.sortRule,
                    state.searchQuery.sortOrder
                ),
            };
        }
        case types.SET_NEW_SORT_RULE: {
            return {
                ...state,
                searchQuery: { ...state.searchQuery, sortRule: action.payload },
                searchUrl: buildSearchUrl(
                    state.searchQuery.categoryNames,
                    state.searchQuery.searchText,
                    state.searchQuery.supplierId,
                    state.searchQuery.pagination,
                    action.payload,
                    state.searchQuery.sortOrder
                ),
            };
        }
        case types.SET_NEW_SORT_ORDER: {
            return {
                ...state,
                searchQuery: { ...state.searchQuery, sortOrder: action.payload },
                searchUrl: buildSearchUrl(
                    state.searchQuery.categoryNames,
                    state.searchQuery.searchText,
                    state.searchQuery.supplierId,
                    state.searchQuery.pagination,
                    state.searchQuery.sortRule,
                    action.payload
                ),
            };
        }
        case types.INIT_DEFAULT_SEARCH_REDUCER: {
            return {
                ...state,
                searchQuery: action.payload,
                searchUrl: buildSearchUrl(
                    action.payload.categoryNames,
                    action.payload.searchText,
                    action.payload.supplierId,
                    action.payload.pagination,
                    action.payload.sortRule,
                    action.payload.sortOrder
                ),
                initialized: true,
            };
        }
        case types.RESTORE_DEFAULT_SEARCH_REDUCER: {
            return {
                ...state,
                searchQuery: {
                    categoryNames: [],
                    searchText: '',
                    supplierId: '',
                    pagination: { page: 0, size: 10 },
                    sortRule: SortRule.DEFAULT,
                    sortOrder: SortOrder.ASC,
                },
                searchUrl: buildSearchUrl([], '', '', { page: 0, size: 10 }, SortRule.DEFAULT, SortOrder.ASC),
            };
        }
        default:
            return state;
    }
};
