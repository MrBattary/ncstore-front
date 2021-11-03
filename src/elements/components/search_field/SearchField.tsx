import React, { useState } from 'react';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

type searchFieldProps = {
    placeholder: string;
    onSearch: (searchText: string) => void;
};

const SearchField: React.FC<searchFieldProps> = ({ placeholder, onSearch }) => {
    const Search = styled('div')(({ theme }) => ({
        flexGrow: 1,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
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

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        padding: theme.spacing(1, 1, 1, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        '& .MuiInputBase-input': {
            width: '100%',
        },
    }));

    const [searchText, setSearchText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchText(e.target.value);
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
            <SearchIconWrapper className='search__icon' onClick={doSearch}>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                className='search__input'
                autoFocus
                placeholder={placeholder}
                value={searchText}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange}
                onKeyDown={tryToDoSearch}
            />
        </Search>
    );
};

export default SearchField;
