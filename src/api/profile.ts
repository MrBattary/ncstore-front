import { getHTTP } from '../fetcher/fetcher';
import { combineUrls } from './utilities';
import {companyInfoSubUrl, coreUrl, otherCompanyInfoSubUrl, otherPersonInfoSubUrl, personInfoSubUrl} from './urls';
import { PersonProfile } from '../types/PersonProfile';
import { CompanyProfile } from '../types/CompanyProfile';
import headers from '../fetcher/headers';

const getPersonProfile = (token: string) =>
    getHTTP<PersonProfile>(combineUrls([coreUrl, personInfoSubUrl]), headers.buildHeaderTokenAcceptJson(token));

const getCompanyProfile = (token: string) =>
    getHTTP<CompanyProfile>(combineUrls([coreUrl, companyInfoSubUrl]), headers.buildHeaderTokenAcceptJson(token));

const getOtherPersonProfile = (userId: string) =>
    getHTTP<PersonProfile>(combineUrls([coreUrl, otherPersonInfoSubUrl, userId]), headers.buildHeaderAcceptJson());

const getOtherCompanyProfile = (userId: string) =>
    getHTTP<CompanyProfile>(combineUrls([coreUrl, otherCompanyInfoSubUrl, userId]), headers.buildHeaderAcceptJson());

const profileApi = {
    getPersonProfile,
    getCompanyProfile,
    getOtherPersonProfile,
    getOtherCompanyProfile
};

export default profileApi;
