import { getHTTP } from '../fetcher/fetcher';
import { combineUrls } from './utilities';
import { companySubUrl, coreUrl, personSubUrl } from './urls';
import { PersonProfile } from '../types/PersonProfile';
import { CompanyProfile } from '../types/CompanyProfile';
import headers from '../fetcher/headers';

const getPersonProfile = (token: string) =>
    getHTTP<PersonProfile>(combineUrls([coreUrl, personSubUrl]), headers.buildHeaderTokenAcceptJson(token));

const getCompanyProfile = (token: string) =>
    getHTTP<CompanyProfile>(combineUrls([coreUrl, companySubUrl]), headers.buildHeaderTokenAcceptJson(token));

const profileApi = {
    getPersonProfile,
    getCompanyProfile,
};

export default profileApi;
