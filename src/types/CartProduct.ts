export type CartProduct = {
    productId: string;
    productCount: number;
    productName: string;
    normalPrice: number;
    discountPrice: number | null;
    priceCurrency: string;
};
