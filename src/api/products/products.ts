import { Pagination } from '../../types/Pagination';
import { getHTTP } from '../../fetcher/fetcher';
import { GetProductsResponse } from './responses';
import { coreUrl, productsSubUrl } from '../urls';

const buildQueryFromObject = (object: any) => {
    let query = '';
    for (const [key, value] of Object.entries(object)) {
        // @ts-ignore
        query += `${key.toString()}=${value.toString()}&`;
    }
    query = query.slice(0, -1);
    return query;
};

const buildPaginationQuery = (pagination: Pagination) => {
    return buildQueryFromObject(pagination);
};

const combineUrl = (urls: string[]) => {
    return urls.join();
};

const getProducts = (pagination: Pagination) => {
    getHTTP<GetProductsResponse>(combineUrl([coreUrl, productsSubUrl, '?', buildPaginationQuery(pagination)]));
};

const productsApi = {
    getProducts,
};

export default productsApi;
