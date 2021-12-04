import {postHTTP} from "../fetcher/fetcher";
import {combineUrls} from "./utilities";
import {addBalanceSubUrl, changePasswordSubUrl, coreUrl} from "./urls";
import headers from "../fetcher/headers";
import {ChangePasswordDetails} from "../types/ChangePasswordDetails";
import {EmptyType} from "../types/EmptyType";
import {AddBalancePayment, NewBalanceValue} from "../types/Payment";

const changePassword = (changePasswordDetails: ChangePasswordDetails, token : string) =>
    postHTTP<EmptyType>(
        combineUrls([coreUrl, changePasswordSubUrl]),
        headers.buildHeaderTokenContentJson(token),
        changePasswordDetails
    );

const addBalance = (addBalancePayment: AddBalancePayment, token : string) =>
    postHTTP<NewBalanceValue>(
        combineUrls([coreUrl, addBalanceSubUrl]),
        headers.buildHeaderTokenContentJsonAcceptJson(token),
        addBalancePayment
    );

const userApi = {
    changePassword,
    addBalance
};

export default userApi;