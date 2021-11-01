import { Pagination } from '../../types/Pagination';
import { getHTTP } from '../../fetcher/fetcher';
import { GetProductsResponse } from './responses';
import { buildQueryFromObject, combineUrls } from '../utilities';
import { coreUrl, productsSubUrl } from '../urls';

const getProducts = (pagination: Pagination) =>
    getHTTP<GetProductsResponse>(combineUrls([coreUrl, productsSubUrl, '?', buildQueryFromObject(pagination)]));

const productsApi = {
    getProducts,
};

export default productsApi;
