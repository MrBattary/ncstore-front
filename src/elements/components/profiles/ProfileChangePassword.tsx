import React from 'react';

import {Box, Container, Paper, Stack, Typography} from '@mui/material';

import {Form, Input} from "antd";
import LoadingButton from "@mui/lab/LoadingButton";

import './style.css';

type profileProps = {
    loading: boolean;
    onFinish: (event: any) => void;
    onFinishFailed: (event: any) => void;
};

const ProfileChangePassword: React.FC<profileProps> = ({ loading, onFinish, onFinishFailed}) => {

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
                        <Typography align="center" variant="h4">Change password</Typography>
                        <Form>
                            <Form.Item
                                className='sign-up__field'
                                label='Old password'
                                name='password-old'
                                rules={[
                                    {required: true, message: 'Please input your old password!'},
                                ]}
                            >
                                <Input.Password name='password-old'/>
                            </Form.Item>
                            <Form.Item
                                label='New password'
                                name='password-new'
                                rules={[
                                    {required: true, message: 'Please input your new password!'},
                                    {min: 8, message: 'Password must be minimum 8 characters!'},
                                ]}
                            >
                                <Input.Password name='password-new'/>
                            </Form.Item>
                            <Form.Item
                                label='Confirm new Password'
                                name='password-new-confirm'
                                dependencies={['password-new']}
                                rules={[
                                    {required: true, message: 'Please confirm your new password!'},
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password-new') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password name='password-new-confirm'/>
                            </Form.Item>
                            <LoadingButton
                                type='submit'
                                loading={loading}
                                variant='contained'
                                sx={{margin: 2, marginBottom: 3}}
                            >
                                Change
                            </LoadingButton>
                        </Form>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfileChangePassword;