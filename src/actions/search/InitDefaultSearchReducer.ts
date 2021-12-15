import { Dispatch } from 'redux';

import { INIT_DEFAULT_SEARCH_REDUCER } from './searchActionTypes';
import { SortOrder, SortRule } from '../../types/SortEnum';
import { SearchQuery } from '../../types/SearchQuery';

export type InitDefaultSearchReducerAction = {
    type: typeof INIT_DEFAULT_SEARCH_REDUCER;
    payload: SearchQuery;
};

export const initDefaultSearchReducer = (searchUrl: string) => (dispatch: Dispatch<InitDefaultSearchReducerAction>) => {
    const params = new URLSearchParams(searchUrl);

    const categoryNamesOne: string | null = params.get('categoryNames');
    const categoryNames: string[] = categoryNamesOne ? categoryNamesOne.split('|') : [];
    const searchText: string | null = params.get('searchText');
    const supplierId: string | null = params.get('supplierId');
    const page: string | null = params.get('page');
    const size: string | null = params.get('size');
    const sort: string | null = params.get('sort');
    const sortOrder: string | null = params.get('sortOrder');

    const searchQuery: SearchQuery = {
        categoryNames: categoryNames,
        searchText: searchText ? searchText : '',
        supplierId: supplierId ? supplierId : '',
        pagination: {
            page: parseInt(page ? page : '0'),
            size: parseInt(size ? size : '10'),
        },
        sortRule: SortRule[(sort ? sort : SortRule.DEFAULT) as SortRule],
        sortOrder: SortOrder[(sortOrder ? sortOrder : SortOrder.ASC) as SortOrder],
    };

    dispatch({ type: INIT_DEFAULT_SEARCH_REDUCER, payload: searchQuery });
};
