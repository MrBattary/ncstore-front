import React from 'react';

import {Box, Button, Paper} from '@mui/material';
import {CategoriesList} from "../../../types/CategoriesGet";

type homeCategoryPickProps = {
    categories: CategoriesList;
    onClick: (categoryName: string) => void;
};

const HomeCategoryPick: React.FC<homeCategoryPickProps> = ({categories, onClick}) => {

    const renderCategories = () => {
        return (
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'stretch',
                justifyContent: 'center',
            }}
            >
                {categories.map((e) => {
                        return (
                            <Button variant="outlined" key={e.categoryName}
                                    sx={{margin:1}}
                                    onClick={() => {
                                        onClick(e.categoryName);
                                    }}>
                                {e.categoryName}
                            </Button>
                        );
                    }
                )}
            </Box>
        )
    }

    return (
        <Paper elevation={5} sx={{padding: 3}}>
            {renderCategories()}
        </Paper>
    );
};

export default HomeCategoryPick;
