import { NormalPrice } from '../types/NormalPrice';
import countries from 'countries-list';

const convertCountryNamesToLanguageTagFromNormalPrices = (normalPrices: NormalPrice[]) => {
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

export const converters = {
    convertCountryNamesToLanguageTagFromNormalPrices,
};
