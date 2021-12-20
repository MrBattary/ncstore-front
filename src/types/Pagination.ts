export type Pagination = {
    page: number;
    size: number;
};

export const defaultPagination: Pagination = {
    page: 0,
    size: 20,
};
