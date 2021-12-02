import {postHTTP} from "../fetcher/fetcher";
import {combineUrls} from "./utilities";
import {changePasswordSubUrl, coreUrl} from "./urls";
import headers from "../fetcher/headers";
import {ChangePasswordDetails} from "../types/ChangePasswordDetails";
import {EmptyType} from "../types/EmptyType";

const changePassword = (changePasswordDetails: ChangePasswordDetails, token : string) =>
    postHTTP<EmptyType>(
        combineUrls([coreUrl, changePasswordSubUrl]),
        headers.buildHeaderTokenContentJson(token),
        changePasswordDetails
    );

const userApi = {
    changePassword,
};

export default userApi;