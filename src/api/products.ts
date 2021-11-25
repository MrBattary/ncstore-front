import { Pagination } from '../types/Pagination';
import { deleteHTTP, getHTTP, postHTTP } from '../fetcher/fetcher';
import { buildQueryFromObject, combineUrls } from './utilities';
import { coreUrl, productsSubUrl, productSubUrl } from './urls';
import { ProductsList } from '../types/ProductsList';
import headers from '../fetcher/headers';
import { Product } from '../types/Product';
import { ProductInfo } from '../types/ProductInfo';

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

const getProduct = (productId: string) =>
    getHTTP<ProductInfo>(combineUrls([coreUrl, productSubUrl, productId]), headers.buildHeaderAcceptJson());

const deleteProduct = (productId: string, token: string) =>
    deleteHTTP<Product>(combineUrls([coreUrl, productSubUrl, productId]), headers.buildHeaderTokenAcceptJson(token));

const productsApi = {
    getProducts,
    newProduct,
    getProduct,
    deleteProduct,
};

export default productsApi;
