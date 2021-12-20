import { NormalPrice } from './NormalPrice';
import { DiscountPrice } from './DiscountPrice';

export type ProductWithSupplier = {
    productId: string;
    productName: string;
    productDescription: string | null;
    supplierId: string | null;
    supplierName: string | null;
    normalPrices: Array<NormalPrice>;
    discountPrices: Array<DiscountPrice>;
    parentProductId: string | null;
    categoriesNames: Array<string>;
};
