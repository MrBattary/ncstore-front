import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Sort } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { SortOrder } from '../../../types/SortEnum';
import { setNewSortOrder } from '../../../actions/search/SetNewSortOrder';
import { AppState } from '../../../reducers/rootReducer';

type sortOrderButtonProps = {
    // SortOrder.RAND is not recommended for use
    defaultValue?: SortOrder.ASC | SortOrder.DESC | null;
    disabled: boolean;
    style?: React.CSSProperties;
};

const SortOrderButton: React.FC<sortOrderButtonProps> = ({ defaultValue, disabled, style }) => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector((state: AppState) => state.searchReducer);

    const [sortOrderButtonStyle, setSortOrderButtonStyle] = useState({ transform: 'scale(1)', color: 'primary' });

    useEffect(() => {
        if (searchQuery.sortOrder !== defaultValue) {
            dispatch(setNewSortOrder(defaultValue ? defaultValue : SortOrder.ASC));
        }
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setButtonStyle(searchQuery.sortOrder ? searchQuery.sortOrder : SortOrder.ASC);
    }, [searchQuery.sortOrder]);

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
    };

    return (
        <IconButton
            onClick={handleChangeSortOrder}
            color={sortOrderButtonStyle.color as 'primary' | 'secondary'}
            disabled={disabled}
            style={style}
        >
            <Sort style={{ transform: sortOrderButtonStyle.transform }} />
        </IconButton>
    );
};

export default SortOrderButton;
