export type ProductsList = ProductFromList[];

export type ProductFromList = {
    productId: string;
    productName: string;
    normalPrice: number;
    discountPrice: number | null;
    priceCurrency: string;
};
