import {postHTTP} from "../fetcher/fetcher";
import {combineUrls} from "./utilities";
import {coreUrl, signInSubUrl, signUpCompanySubUrl, signUpPersonSubUrl} from "./urls";
import {CompanySignUpDetails, PersonSignUpDetails} from "../types/SignUpDetails";
import {EmptyType} from "../types/EmptyType";
import {SignInDetails, SignInResponse} from "../types/SignInDetails";

const signUpCompany = (companySignUpDetails: CompanySignUpDetails) =>
    postHTTP<EmptyType>(
        combineUrls([
            coreUrl,
            signUpCompanySubUrl]),
        companySignUpDetails
    );

const signUpPerson = (personSignUpDetails: PersonSignUpDetails) =>
    postHTTP<EmptyType>(
        combineUrls([
            coreUrl,
            signUpPersonSubUrl]),
        personSignUpDetails
    );

const signIn = (signInDetails: SignInDetails) =>
    postHTTP<SignInResponse>(
        combineUrls([
            coreUrl,
            signInSubUrl]),
        signInDetails
    );

const authApi = {
    signUpCompany,
    signUpPerson,
    signIn
};

export default authApi;
