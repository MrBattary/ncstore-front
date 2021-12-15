import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { SortOrder, SortRule } from '../../../types/SortEnum';
import { setNewSortRule } from '../../../actions/search/SetNewSortRule';
import { setNewSortOrder } from '../../../actions/search/SetNewSortOrder';

enum SortNaming {
    ALPHABETICALLY = 'Alphabetically',
    ALPHABETICALLY_REVERSE = 'Alphabetically reverse',
    INEXPENSIVE_FIRST = 'Inexpensive first',
    EXPENSIVE_FIRST = 'Expensive first',
    DISCOUNTED_FIRST = 'Discounted first',
    MOST_POPULAR = 'Most popular',
    BEST = 'Best rating',
    NEW_PRODUCTS = 'New products',
}

type ProductsNamingSort = {
    sortNaming: SortNaming;
    sortRule: SortRule;
    sortOrder: SortOrder;
};

const productsSortArray: ProductsNamingSort[] = [
    { sortNaming: SortNaming.ALPHABETICALLY, sortRule: SortRule.DEFAULT, sortOrder: SortOrder.ASC },
    { sortNaming: SortNaming.ALPHABETICALLY_REVERSE, sortRule: SortRule.DEFAULT, sortOrder: SortOrder.DESC },
    { sortNaming: SortNaming.INEXPENSIVE_FIRST, sortRule: SortRule.PRICE, sortOrder: SortOrder.ASC },
    { sortNaming: SortNaming.EXPENSIVE_FIRST, sortRule: SortRule.PRICE, sortOrder: SortOrder.DESC },
    { sortNaming: SortNaming.DISCOUNTED_FIRST, sortRule: SortRule.DISCOUNT, sortOrder: SortOrder.DESC },
    { sortNaming: SortNaming.MOST_POPULAR, sortRule: SortRule.POPULAR, sortOrder: SortOrder.DESC },
    { sortNaming: SortNaming.BEST, sortRule: SortRule.RATING, sortOrder: SortOrder.DESC },
    { sortNaming: SortNaming.NEW_PRODUCTS, sortRule: SortRule.DATE, sortOrder: SortOrder.DESC },
];

type productsSortProps = {
    defaultSortRule: SortRule;
    defaultSortOrder: SortOrder;
    disabled: boolean;
    style?: React.CSSProperties;
};

const ProductsSort: React.FC<productsSortProps> = ({ defaultSortRule, defaultSortOrder, disabled, style }) => {
    const dispatch = useDispatch();
    const [sort, setSort] = useState<string>(SortNaming.ALPHABETICALLY);

    const findProductsNamingSortBySorts = (sortRule: SortRule, sortOrder: SortOrder) =>
        productsSortArray.find(
            productsNamingSort => productsNamingSort.sortRule === sortRule && productsNamingSort.sortOrder === sortOrder
        );

    const findProductsNamingSortByNaming = (sortNaming: SortNaming) =>
        productsSortArray.find(productsNamingSort => productsNamingSort.sortNaming === sortNaming);

    useEffect(() => {
        const defaultSort = productsSortArray[0];
        let newProductsSort = findProductsNamingSortBySorts(defaultSortRule, defaultSortOrder);
        if (JSON.stringify(defaultSort) !== JSON.stringify(newProductsSort)) {
            if (!newProductsSort) {
                newProductsSort = defaultSort;
            }
            setSort(newProductsSort.sortNaming);
            dispatch(setNewSortRule(newProductsSort.sortRule));
            dispatch(setNewSortOrder(newProductsSort.sortOrder));
        }
    }, [defaultSortOrder, defaultSortRule, dispatch]);

    const handleChangeProductsSort = (e: SelectChangeEvent) => {
        const newProductsSort = findProductsNamingSortByNaming(e.target.value as SortNaming);
        if (newProductsSort) {
            setSort(newProductsSort.sortNaming);
            dispatch(setNewSortRule(newProductsSort.sortRule));
            dispatch(setNewSortOrder(newProductsSort.sortOrder));
        }
    };

    return (
        <FormControl size='small' disabled={disabled} style={{ ...style, width: '220px' }}>
            <InputLabel id='sort-selectors__label' style={{ width: '100px' }}>
                Order by
            </InputLabel>
            <Select
                labelId='sort-selectors__label'
                id='sort-selectors__select-label'
                value={sort}
                label='Order by'
                onChange={handleChangeProductsSort}
            >
                <MenuItem value={SortNaming.ALPHABETICALLY}>{SortNaming.ALPHABETICALLY.toString()}</MenuItem>
                <MenuItem value={SortNaming.ALPHABETICALLY_REVERSE}>
                    {SortNaming.ALPHABETICALLY_REVERSE.toString()}
                </MenuItem>
                <MenuItem value={SortNaming.INEXPENSIVE_FIRST}>{SortNaming.INEXPENSIVE_FIRST.toString()}</MenuItem>
                <MenuItem value={SortNaming.EXPENSIVE_FIRST}>{SortNaming.EXPENSIVE_FIRST.toString()}</MenuItem>
                <MenuItem value={SortNaming.NEW_PRODUCTS}>{SortNaming.NEW_PRODUCTS.toString()}</MenuItem>
                <MenuItem value={SortNaming.DISCOUNTED_FIRST}>{SortNaming.DISCOUNTED_FIRST.toString()}</MenuItem>
                <MenuItem value={SortNaming.MOST_POPULAR}>{SortNaming.MOST_POPULAR.toString()}</MenuItem>
                <MenuItem value={SortNaming.BEST}>{SortNaming.BEST.toString()}</MenuItem>
            </Select>
        </FormControl>
    );
};

export default ProductsSort;
