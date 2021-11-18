import { Pagination } from '../types/Pagination';
import { getHTTP } from '../fetcher/fetcher';
import { buildQueryFromObject, combineUrls } from './utilities';
import { coreUrl, productsSubUrl } from './urls';
import { ProductsList } from '../types/ProductsList';
import headers from '../fetcher/headers';

const getProducts = (searchText: string, pagination: Pagination) =>
    getHTTP<ProductsList>(
        combineUrls([
            coreUrl,
            productsSubUrl,
            '?',
            buildQueryFromObject({ searchText }),
            '&',
            buildQueryFromObject(pagination),
        ]),
        headers.buildHeaderAcceptJson()
    );

const productsApi = {
    getProducts,
};

export default productsApi;
