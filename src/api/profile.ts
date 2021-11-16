import { getHTTP } from '../fetcher/fetcher';
import { combineUrls } from './utilities';
import { companySubUrl, coreUrl, personSubUrl } from './urls';
import { PersonProfile } from '../types/PersonProfile';
import { CompanyProfile } from '../types/CompanyProfile';

const getPersonProfile = () => getHTTP<PersonProfile>(combineUrls([coreUrl, personSubUrl]));

const getCompanyProfile = () => getHTTP<CompanyProfile>(combineUrls([coreUrl, companySubUrl]));

const profileApi = {
    getPersonProfile,
    getCompanyProfile,
};

export default profileApi;
