import { getHTTP } from '../fetcher/fetcher';
import { Cart } from '../types/Cart';
import { combineUrls } from './utilities';
import { cartSubUrl, coreUrl } from './urls';
import { buildHeaderTokenAcceptJson } from '../fetcher/headers';

const getCart = (token: string) => getHTTP<Cart>(combineUrls([coreUrl, cartSubUrl]), buildHeaderTokenAcceptJson(token));

const cartApi = {
    getCart,
};

export default cartApi;
