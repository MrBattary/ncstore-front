export type ProductsList = ProductFromList[];

export type ProductFromList = {
    productId: string;
    productName: string;
    productPrice: number;
    productCurrency: string;
};