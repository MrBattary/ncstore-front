import React, { useState } from 'react';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

type searchFieldProps = {
    placeholder: string;
    onSearch: (searchText: string) => void;
};

const SearchField: React.FC<searchFieldProps> = ({ placeholder, onSearch }) => {
    const Search = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        position: 'relative',
        borderRadius: 30,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        maxWidth: 600,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const IconWrapper = styled(IconButton)(({ theme }) => ({
        padding: theme.spacing(1.5, 1.5),
        color: 'inherit',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        margin: theme.spacing(0, 0.5),
        padding: theme.spacing(1, 0),
        '& .MuiInputBase-input': {
            width: '100%',
        },
    }));

    const [searchText, setSearchText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchText(e.target.value);
    };

    const handleClear = () => {
        setSearchText('');
    };

    const tryToDoSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            doSearch();
        }
    };

    const doSearch = () => {
        onSearch(searchText);
    };

    return (
        <Search className='search'>
            <IconWrapper className='search__icon' onClick={doSearch}>
                <SearchIcon />
            </IconWrapper>
            <StyledInputBase
                className='search__input'
                autoFocus
                placeholder={placeholder}
                value={searchText}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange}
                onKeyDown={tryToDoSearch}
            />
            <IconWrapper
                sx={searchText ? { display: 'auto' } : { display: 'none' }}
                className='clear__icon'
                onClick={handleClear}
            >
                <CancelIcon />
            </IconWrapper>
        </Search>
    );
};

export default SearchField;
