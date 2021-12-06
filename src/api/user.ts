import {getHTTP, postHTTP} from "../fetcher/fetcher";
import {combineUrls} from "./utilities";
import {balanceSubUrl, changePasswordSubUrl, coreUrl} from "./urls";
import headers from "../fetcher/headers";
import {ChangePasswordDetails} from "../types/ChangePasswordDetails";
import {EmptyType} from "../types/EmptyType";
import {AddBalancePayment, Balance} from "../types/Balance";

const changePassword = (changePasswordDetails: ChangePasswordDetails, token : string) =>
    postHTTP<EmptyType>(
        combineUrls([coreUrl, changePasswordSubUrl]),
        headers.buildHeaderTokenContentJson(token),
        changePasswordDetails
    );

const addBalance = (addBalancePayment: AddBalancePayment, token : string) =>
    postHTTP<Balance>(
        combineUrls([coreUrl, balanceSubUrl]),
        headers.buildHeaderTokenContentJsonAcceptJson(token),
        addBalancePayment
    );

const getBalance = (token : string) =>
    getHTTP<Balance>(
        combineUrls([coreUrl, balanceSubUrl]),
        headers.buildHeaderTokenAcceptJson(token),
    );

const userApi = {
    changePassword,
    addBalance,
    getBalance
};

export default userApi;