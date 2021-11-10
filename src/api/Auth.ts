import {postHTTP} from "../fetcher/fetcher";
import {combineUrls} from "./utilities";
import {coreUrl, signUpCompanySubUrl, signUpPersonSubUrl} from "./urls";
import {CompanySignUpDetails, PersonSignUpDetails} from "../types/SignUpDetails";
import {EmptyType} from "../types/EmptyType";

const signUpCompany = (companySignUpDetails : CompanySignUpDetails) =>
    postHTTP<EmptyType>(
        combineUrls([
            coreUrl,
            signUpCompanySubUrl]),
        companySignUpDetails
    );

const signUpPerson = (personSignUpDetails : PersonSignUpDetails) =>
    postHTTP<EmptyType>(
        combineUrls([
            coreUrl,
            signUpPersonSubUrl]),
        personSignUpDetails
    );

const authApi = {
    signUpCompany,
    signUpPerson
};

export default authApi;