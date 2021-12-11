import { Pagination } from '../types/Pagination';
import { deleteHTTP, getHTTP, postHTTP, putHTTP } from '../fetcher/fetcher';
import { buildQueryFromObject, combineUrls } from './utilities';
import { coreUrl, productDetailedSubUrl, productsSubUrl, productSubUrl } from './urls';
import { ProductsList } from '../types/ProductsList';
import headers from '../fetcher/headers';
import { ProductWithoutId } from '../types/ProductWithoutId';
import { ProductWithSupplier } from '../types/ProductWithSupplier';
import { Product } from '../types/Product';
import { SortOrder, SortRule } from '../types/SortEnum';
import { ProductForSale } from '../types/ProductForSale';

const getProducts = (
    pagination: Pagination,
    searchText: string | null,
    supplierId: string | null,
    sort: SortRule | null,
    sortOrder: SortOrder | null
) =>
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
            '&',
            buildQueryFromObject({ sort }),
            '&',
            buildQueryFromObject({ sortOrder }),
        ]),
        headers.buildHeaderAcceptJson()
    );

const getProductsFromSearch = (search: string) =>
    getHTTP<ProductsList>(combineUrls([coreUrl, productsSubUrl, search]), headers.buildHeaderAcceptJson());

const newProduct = (product: ProductWithoutId, token: string) =>
    postHTTP<Product>(
        combineUrls([coreUrl, productsSubUrl]),
        headers.buildHeaderTokenContentJsonAcceptJson(token),
        product
    );

const getProductForSale = (productId: string) =>
    getHTTP<ProductForSale>(combineUrls([coreUrl, productSubUrl, productId]), headers.buildHeaderAcceptJson());

const getDetailedProduct = (productId: string, token: string) =>
    getHTTP<ProductWithSupplier>(
        combineUrls([coreUrl, productSubUrl, productId, productDetailedSubUrl]),
        headers.buildHeaderTokenAcceptJson(token)
    );

const updateProduct = (product: Product, token: string) =>
    putHTTP<Product>(
        combineUrls([coreUrl, productSubUrl, product.productId]),
        headers.buildHeaderTokenContentJsonAcceptJson(token),
        product
    );

const deleteProduct = (productId: string, token: string) =>
    deleteHTTP<Product>(combineUrls([coreUrl, productSubUrl, productId]), headers.buildHeaderTokenAcceptJson(token));

const productsApi = {
    getProducts,
    getProductsFromSearch,
    newProduct,
    getProductForSale,
    getDetailedProduct,
    updateProduct,
    deleteProduct,
};

export default productsApi;
