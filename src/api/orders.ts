import { buildQueryFromObject, combineUrls } from './utilities';
import { coreUrl, ordersSubUrl, orderSubUrl } from './urls';
import headers from '../fetcher/headers';
import { Pagination } from '../types/Pagination';
import { getHTTP } from '../fetcher/fetcher';
import { Orders } from '../types/Orders';
import { Order } from '../types/Order';

const getMinimalisticOrders = (pagination: Pagination, token: string) =>
    getHTTP<Orders>(
        combineUrls([coreUrl, ordersSubUrl, '?', buildQueryFromObject(pagination)]),
        headers.buildHeaderTokenAcceptJson(token)
    );

const getOrder = (orderId: string, token: string) =>
    getHTTP<Order>(combineUrls([coreUrl, orderSubUrl, orderId]), headers.buildHeaderTokenAcceptJson(token));

const ordersApi = {
    getMinimalisticOrders,
    getOrder,
};

export default ordersApi;
