import {getHTTP} from "../fetcher/fetcher";
import {combineUrls} from "./utilities";
import {coreUrl, paymentSubUrl} from "./urls";
import headers from "../fetcher/headers";
import {PaymentToken} from "../types/Payment";

const getToken = (token : string) =>
    getHTTP<PaymentToken>(
        combineUrls([coreUrl, paymentSubUrl]),
        headers.buildHeaderTokenAcceptJson(token)
    );

const paymentApi = {
    getToken,
};

export default paymentApi;