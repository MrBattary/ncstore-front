import { NormalPrice } from '../types/NormalPrice';
import countries from 'countries-list';

const convertCountryNamesToLanguageTagsFromNormalPrices = (normalPrices: NormalPrice[]) => {
    let nameTagNormalPrices = new Array<NormalPrice>();
    const countryCodes = Object.keys(countries.countries);
    const nameTagMap = new Map();

    countryCodes.forEach(code => {
        // @ts-ignore
        const tag = `${countries.countries[code].languages[0]}-${code}`;
        // @ts-ignore
        nameTagMap.set(countries.countries[code].name, tag);
    });

    normalPrices.forEach(normalPrice => {
        nameTagNormalPrices.push({ price: normalPrice.price, region: nameTagMap.get(normalPrice.region) });
    });

    return nameTagNormalPrices;
};

const convertLanguageTagsToCountryNamesFromNormalPrices = (normalPrices: NormalPrice[]) => {
    let nameCountryNormalPrices = new Array<NormalPrice>();
    const countryCodes = Object.keys(countries.countries);
    const tagNameMap = new Map();

    countryCodes.forEach(code => {
        // @ts-ignore
        const tag = `${countries.countries[code].languages[0]}-${code}`;
        // @ts-ignore
        tagNameMap.set(tag, countries.countries[code].name);
    });

    normalPrices.forEach(normalPrice => {
        nameCountryNormalPrices.push({ price: normalPrice.price, region: tagNameMap.get(normalPrice.region) });
    });

    return nameCountryNormalPrices;
};

export const converters = {
    convertCountryNamesToLanguageTagsFromNormalPrices,
    convertLanguageTagsToCountryNamesFromNormalPrices,
};
