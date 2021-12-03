import { deleteHTTP, getHTTP, postHTTP, putHTTP } from '../fetcher/fetcher';
import { Cart } from '../types/Cart';
import { combineUrls } from './utilities';
import { cartContinuingSubUrl, cartSubUrl, coreUrl } from './urls';
import { buildHeaderTokenAcceptJson, buildHeaderTokenContentJsonAcceptJson } from '../fetcher/headers';
import { CartProductIdAndCount } from '../types/CartProductIdAndCount';
import { CartProduct } from '../types/CartProduct';
import { Order } from '../types/Order';

const checkoutCart = (token: string) =>
    postHTTP<Order>(combineUrls([coreUrl, cartSubUrl]), buildHeaderTokenAcceptJson(token), null);

const deleteItemFromCart = (productId: string, token: string) =>
    deleteHTTP<CartProduct | null>(
        combineUrls([coreUrl, cartContinuingSubUrl, productId]),
        buildHeaderTokenAcceptJson(token)
    );

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
    deleteItemFromCart,
    checkoutCart,
};

export default cartApi;
