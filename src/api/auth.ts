import { postHTTP } from '../fetcher/fetcher';
import { combineUrls } from './utilities';
import { coreUrl, signInSubUrl, signOutSubUrl, signUpCompanySubUrl, signUpPersonSubUrl } from './urls';
import { CompanySignUpDetails, PersonSignUpDetails } from '../types/SignUpDetails';
import { EmptyType } from '../types/EmptyType';
import { SignInDetails, SignInResponse } from '../types/SignInDetails';
import headers from '../fetcher/headers';

const signUpCompany = (companySignUpDetails: CompanySignUpDetails) =>
    postHTTP<EmptyType>(
        combineUrls([coreUrl, signUpCompanySubUrl]),
        headers.buildHeaderContentJson(),
        companySignUpDetails
    );

const signUpPerson = (personSignUpDetails: PersonSignUpDetails) =>
    postHTTP<EmptyType>(
        combineUrls([coreUrl, signUpPersonSubUrl]),
        headers.buildHeaderContentJson(),
        personSignUpDetails
    );

const signIn = (signInDetails: SignInDetails) =>
    postHTTP<SignInResponse>(
        combineUrls([coreUrl, signInSubUrl]),
        headers.buildHeaderContentJsonAcceptJson(),
        signInDetails
    );

const signOut = (token: string) =>
    postHTTP<EmptyType>(combineUrls([coreUrl, signOutSubUrl]), headers.buildHeaderToken(token), null);

const authApi = {
    signUpCompany,
    signUpPerson,
    signIn,
    signOut,
};

export default authApi;
