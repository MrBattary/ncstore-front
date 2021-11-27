import React from 'react';

import {Box, Container, Paper, Stack, Typography} from '@mui/material';

import {Form, InputNumber} from "antd";
import LoadingButton from "@mui/lab/LoadingButton";

import './style.css';

type profileProps = {
    balance: number;
    balanceCurrency: string;
    loading: boolean;
};

const UserProfileBalance: React.FC<profileProps> = ({balance, balanceCurrency, loading}) => {
    const onFinish = () => {

    }

    const onFinishFailed = () => {

    }

    return (
        <Container>
            <Paper elevation={10}>
                <Box sx={{
                    marginTop: 8,
                    paddingTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Stack spacing={2}>
                        <Typography align="center" variant="h3">Your balance</Typography>
                        <Typography align="center" variant="h5">{"Balance: " + balance + balanceCurrency}</Typography>
                        <Form
                            className='balance__form'
                            layout='vertical'
                            size='large'
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label='Add money'
                                name='amount'
                                required
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            if (Number.isInteger(value) && value >= 10) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Enter the correct number!'));
                                        },
                                    }),
                                ]}
                                tooltip={
                                    <>
                                        <div>
                                           Must be greater than 10
                                        </div>
                                    </>
                                }
                            >
                                <InputNumber min={10}/>
                            </Form.Item>
                            <LoadingButton
                                type='submit'
                                loading={loading}
                                variant='contained'
                                sx={{margin: 2, marginBottom: 3}}
                            >
                                Add
                            </LoadingButton>
                        </Form>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};

export default UserProfileBalance;