import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { SortRule } from '../../../types/SortEnum';
import { setNewSortRule } from '../../../actions/search/SetNewSortRule';
import { AppState } from '../../../reducers/rootReducer';

type sortRuleSelectorProps = {
    defaultValue?: SortRule | null;
    disabled: boolean;
    style?: React.CSSProperties;
};

const SortRuleSelector: React.FC<sortRuleSelectorProps> = ({ defaultValue, disabled, style }) => {
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
        <FormControl size='small' disabled={disabled} style={{ ...style, width: '120px' }}>
            <InputLabel id='sort-selectors__label'>Sort</InputLabel>
            <Select
                labelId='sort-selectors__label'
                id='sort-selectors__select-label'
                value={searchQuery.sortRule}
                label='Sort'
                onChange={handleChangeSortRule}
            >
                <MenuItem value={SortRule.DEFAULT}>Default</MenuItem>
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
