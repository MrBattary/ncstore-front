import { Pagination } from './Pagination';
import { SortOrder, SortRule } from './SortEnum';

export type SearchQuery = {
    categoryNames: Array<string>;
    pagination: Pagination;
    searchText: string;
    supplierId: string;
    sortRule: SortRule;
    sortOrder: SortOrder;
};
