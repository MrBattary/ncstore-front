export type ProductForSale = {
    productId: string;
    productName: string;
    productDescription: string | null;
    supplierId: string | null;
    supplierName: string | null;
    normalPrice: number;
    discountPrice: number | null;
    priceCurrency: string;
    startUtcTime: string | null;
    endUtcTime: string | null;
    parentProductId: string | null;
    categoriesNames: Array<string>;
};
