import React from 'react';
import {
    Paper,
    List,
    ListSubheader, ListItemButton, ListItemText, Collapse, ListItem,
} from "@mui/material";
import {CategoriesList, CategoryFromList} from "../../../types/CategoriesGet";
import {Form, Select} from "antd";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

type advancedSearchProps = {
    categories: CategoriesList;
    loading: boolean;
    onFinish: (event: any) => void;
    onFinishFailed: (event: any) => void;
    selectedCategories: Array<string>;
};

const AdvancedSearch: React.FC<advancedSearchProps> = ({categories, loading, onFinish, onFinishFailed, selectedCategories}) => {
    const [categoryListOpen, setCategoryListOpen] = React.useState(true);


    const renderCategoriesSelect = () => {
        return (
            <>
                <ListItemButton onClick={() => setCategoryListOpen(!categoryListOpen)}>
                    <ListItemText primary="Categories"/>
                    {categoryListOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={categoryListOpen} timeout="auto" unmountOnExit sx={{width:'100%'}}>
                    <Form.Item
                        className='form__field'
                        name='categoriesNames'
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="All categories"
                        >
                            {categories.map((e: CategoryFromList) =>
                                <Select.Option key={e.categoryName} value={e.categoryName}>
                                    {e.categoryName}
                                </Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                </Collapse>
            </>
        )
    }

    return (
        <Paper>
            <Form
                layout='vertical'
                size='large'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{categoriesNames: selectedCategories}}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <List
                    sx={{width: '90%',
                        bgcolor: 'background.paper',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Advanced search
                        </ListSubheader>
                    }
                >
                    {renderCategoriesSelect()}
                    <ListItem sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <LoadingButton
                            type='submit'
                            loading={loading}
                            variant='contained'
                        >
                            Apply
                        </LoadingButton>
                    </ListItem>
                </List>
            </Form>
        </Paper>
    );
};

export default AdvancedSearch;
