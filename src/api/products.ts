import { coreUrl, productDetailedSubUrl, productsSubUrl, productSubUrl } from './urls';
import { deleteHTTP, getHTTP, postHTTP, putHTTP } from '../fetcher/fetcher';
import { buildQueryFromObject, combineUrls } from './utilities';
import { ProductsList } from '../types/ProductsList';
import headers from '../fetcher/headers';
import { ProductWithoutId } from '../types/ProductWithoutId';
import { ProductWithSupplier } from '../types/ProductWithSupplier';
import { Product } from '../types/Product';
import { ProductForSale } from '../types/ProductForSale';
import { SearchQuery } from '../types/SearchQuery';

const getProducts = (searchQuery: SearchQuery) =>
    getHTTP<ProductsList>(
        combineUrls([
            coreUrl,
            productsSubUrl,
            '?',
            buildQueryFromObject({ categoryNames: searchQuery.categoryNames.join('|') }),
            '&',
            buildQueryFromObject({ searchText: searchQuery.searchText }),
            '&',
            buildQueryFromObject({ supplierId: searchQuery.supplierId }),
            '&',
            buildQueryFromObject(searchQuery.pagination),
            '&',
            buildQueryFromObject({ sort: searchQuery.sortRule }),
            '&',
            buildQueryFromObject({ sortOrder: searchQuery.sortOrder }),
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
