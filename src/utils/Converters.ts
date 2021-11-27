import { NormalPrice } from '../types/NormalPrice';
import countries from 'countries-list';
import { DiscountPrice } from '../types/DiscountPrice';

const convertCountryNamesToLanguageTagsFromPricesArray = (prices: NormalPrice[] | DiscountPrice[]) => {
    let nameTagPrices = new Array<NormalPrice | DiscountPrice>();
    const countryCodes = Object.keys(countries.countries);
    const nameTagMap = new Map();

    countryCodes.forEach(code => {
        // @ts-ignore
        const tag = `${countries.countries[code].languages[0]}-${code}`;
        // @ts-ignore
        nameTagMap.set(countries.countries[code].name, tag);
    });

    prices.forEach((price: NormalPrice | DiscountPrice) => {
        // @ts-ignore
        if (price.startUtcTime && price.endUtcTime) {
            nameTagPrices.push({
                price: price.price,
                region: nameTagMap.get(price.region),
                // @ts-ignore
                startUtcTime: price.startUtcTime,
                // @ts-ignore
                endUtcTime: price.endUtcTime,
            });
        } else {
            nameTagPrices.push({ price: price.price, region: nameTagMap.get(price.region) });
        }
    });

    return nameTagPrices;
};

const convertLanguageTagsToCountryNamesFromPricesArray = (normalPrices: NormalPrice[] | DiscountPrice[]) => {
    let nameCountryPrices = new Array<NormalPrice | DiscountPrice>();
    const countryCodes = Object.keys(countries.countries);
    const tagNameMap = new Map();

    countryCodes.forEach(code => {
        // @ts-ignore
        const tag = `${countries.countries[code].languages[0]}-${code}`;
        // @ts-ignore
        tagNameMap.set(tag, countries.countries[code].name);
    });

    normalPrices.forEach((price: NormalPrice | DiscountPrice) => {
        // @ts-ignore
        if (price.startUtcTime && price.endUtcTime) {
            nameCountryPrices.push({
                price: price.price,
                region: tagNameMap.get(price.region),
                // @ts-ignore
                startUtcTime: price.startUtcTime,
                // @ts-ignore
                endUtcTime: price.endUtcTime,
            });
        } else {
            nameCountryPrices.push({ price: price.price, region: tagNameMap.get(price.region) });
        }
    });

    return nameCountryPrices;
};

export const converters = {
    convertCountryNamesToLanguageTagsFromPricesArray,
    convertLanguageTagsToCountryNamesFromPricesArray,
};
