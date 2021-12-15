import React from 'react';

import {Box, Container, Paper, Stack, Typography} from '@mui/material';

import {Form} from "antd";
import LoadingButton from "@mui/lab/LoadingButton";

import './style.css';
import AdditionalFormItemsForSupplierPerson from "../signup_forms/AdditionalFormItemsForSupplierPerson";

type profileBecomeSupplierProps = {
    loading: boolean;
    isPerson: boolean
    onFinish: (event: any) => void;
    onFinishFailed: (event: any) => void;
};

const ProfileBecomeSupplier: React.FC<profileBecomeSupplierProps> = ({
                                                                         loading,
                                                                         isPerson,
                                                                         onFinish,
                                                                         onFinishFailed
                                                                     }) => {

    const renderPersonAdditionalFields = () => {
        if (isPerson) {
            return (
                <AdditionalFormItemsForSupplierPerson/>
            );
        }
    }

    return (
        <Container>
            <Paper elevation={10}>
                <Box sx={{
                    paddingTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Stack spacing={2}>
                        <Typography align="center" variant="h4">Become supplier</Typography>
                        <Form
                            layout='vertical'
                            size='large'
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {renderPersonAdditionalFields()}
                            <LoadingButton
                                type='submit'
                                loading={loading}
                                variant='contained'
                                sx={{margin: 2, marginBottom: 3}}
                            >
                                Become supplier
                            </LoadingButton>
                        </Form>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfileBecomeSupplier;