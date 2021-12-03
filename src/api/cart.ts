import { getHTTP, putHTTP } from '../fetcher/fetcher';
import { Cart } from '../types/Cart';
import { combineUrls } from './utilities';
import { cartSubUrl, coreUrl } from './urls';
import { buildHeaderTokenAcceptJson, buildHeaderTokenContentJsonAcceptJson } from '../fetcher/headers';
import { CartProductIdAndCount } from '../types/CartProductIdAndCount';
import { CartProduct } from '../types/CartProduct';

const updateItemInCart = (cartProductIdAndCount: CartProductIdAndCount, token: string) =>
    putHTTP<CartProduct>(
        combineUrls([coreUrl, cartSubUrl]),
        buildHeaderTokenContentJsonAcceptJson(token),
        cartProductIdAndCount
    );

const getCart = (token: string) => getHTTP<Cart>(combineUrls([coreUrl, cartSubUrl]), buildHeaderTokenAcceptJson(token));

const cartApi = {
    getCart,
    updateItemInCart,
};

export default cartApi;
