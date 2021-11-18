import { NormalPrice } from './NormalPrice';
import { DiscountPrice } from './DiscountPrice';

export type Product = {
    productName: string;
    productDescription: string | null;
    normalPrices: Array<NormalPrice>;
    discountPrices: Array<DiscountPrice>;
    parentProductId: string | null;
    categoriesNames: Array<string>;
};
