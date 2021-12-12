import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Sort } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { SortOrder } from '../../../types/SortEnum';
import { setNewSortOrder } from '../../../actions/search/SetNewSortOrder';
import { AppState } from '../../../reducers/rootReducer';

type sortOrderButtonProps = {
    // SortOrder.RAND is not recommended for use
    defaultValue: SortOrder.ASC | SortOrder.DESC | null;
};

const SortOrderButton: React.FC<sortOrderButtonProps> = ({ defaultValue }) => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector((state: AppState) => state.searchReducer);

    const [sortOrderButtonStyle, setSortOrderButtonStyle] = useState({ transform: 'scale(1)', color: 'primary' });

    useEffect(() => {
        if (searchQuery.sortOrder !== defaultValue) {
            dispatch(setNewSortOrder(defaultValue ? defaultValue : SortOrder.ASC));
        }
        setButtonStyle(defaultValue ? defaultValue : SortOrder.ASC);
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const setButtonStyle = (sortOrder: SortOrder) => {
        if (sortOrder === SortOrder.ASC) {
            setSortOrderButtonStyle({ transform: 'scale(1)', color: 'primary' });
        } else {
            setSortOrderButtonStyle({ transform: 'scale(1, -1)', color: 'secondary' });
        }
    };

    const handleChangeSortOrder = () => {
        if (searchQuery.sortOrder === SortOrder.ASC) {
            dispatch(setNewSortOrder(SortOrder.DESC));
        } else {
            dispatch(setNewSortOrder(SortOrder.ASC));
        }
        setButtonStyle(searchQuery.sortOrder);
    };

    return (
        <IconButton onClick={handleChangeSortOrder} color={sortOrderButtonStyle.color as 'primary' | 'secondary'}>
            <Sort style={{ transform: sortOrderButtonStyle.transform }} />
        </IconButton>
    );
};

export default SortOrderButton;
