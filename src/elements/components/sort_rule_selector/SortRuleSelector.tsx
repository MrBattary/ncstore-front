import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { SortRule } from '../../../types/SortEnum';
import { setNewSortRule } from '../../../actions/search/SetNewSortRule';
import { AppState } from '../../../reducers/rootReducer';

type sortRuleSelectorProps = {
    defaultValue: SortRule | null;
};

const SortRuleSelector: React.FC<sortRuleSelectorProps> = ({ defaultValue }) => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector((state: AppState) => state.searchReducer);

    useEffect(() => {
        if (searchQuery.sortRule !== defaultValue) {
            dispatch(setNewSortRule(defaultValue ? defaultValue : SortRule.DEFAULT));
        }
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const handleChangeSortRule = (e: SelectChangeEvent) => {
        dispatch(setNewSortRule(SortRule[e.target.value as SortRule]));
    };

    return (
        <FormControl fullWidth size='small'>
            <InputLabel id='sort-selectors__label'>Order by</InputLabel>
            <Select
                labelId='sort-selectors__select-label'
                id='sort-selectors__select-label'
                value={searchQuery.sortRule}
                label='Age'
                onChange={handleChangeSortRule}
            >
                <MenuItem value={SortRule.DEFAULT}>None</MenuItem>
                <MenuItem value={SortRule.RATING}>Rating</MenuItem>
                <MenuItem value={SortRule.POPULAR}>Popularity</MenuItem>
                <MenuItem value={SortRule.DATE}>Date</MenuItem>
                <MenuItem value={SortRule.PRICE}>Price</MenuItem>
                <MenuItem value={SortRule.DISCOUNT}>Discount</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SortRuleSelector;
