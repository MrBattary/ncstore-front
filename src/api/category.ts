import {getHTTP} from "../fetcher/fetcher";
import {combineUrls} from "./utilities";
import {categorySubUrl, coreUrl,} from "./urls";
import headers from "../fetcher/headers";
import {CategoriesList} from "../types/CategoriesGet";

const getCategories = () =>
    getHTTP<CategoriesList>(
        combineUrls([
            coreUrl,
            categorySubUrl,
        ]),
        headers.buildHeaderAcceptJson()
    );

const categoryApi = {
    getCategories
};

export default categoryApi;
