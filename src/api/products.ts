import { Pagination } from '../types/Pagination';
import { getHTTP, postHTTP } from '../fetcher/fetcher';
import { buildQueryFromObject, combineUrls } from './utilities';
import { coreUrl, productsSubUrl } from './urls';
import { ProductsList } from '../types/ProductsList';
import headers from '../fetcher/headers';
import { Product } from '../types/Product';

const getProducts = (pagination: Pagination, searchText: string | null, supplierId: string | null) =>
    getHTTP<ProductsList>(
        combineUrls([
            coreUrl,
            productsSubUrl,
            '?',
            buildQueryFromObject({ searchText }),
            '&',
            buildQueryFromObject({ supplierId }),
            '&',
            buildQueryFromObject(pagination),
        ]),
        headers.buildHeaderAcceptJson()
    );

const newProduct = (product: Product, token: string) =>
    postHTTP<Product>(
        combineUrls([coreUrl, productsSubUrl]),
        headers.buildHeaderTokenContentJsonAcceptJson(token),
        product
    );

const productsApi = {
    getProducts,
    newProduct,
};

export default productsApi;
