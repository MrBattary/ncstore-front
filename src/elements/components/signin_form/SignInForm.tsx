import React from 'react';
import { Form, Input } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import './style.css';

type signInFormProps = {
    onFinish: (event: any) => void;
    onFinishFailed: (event: any) => void;
    onClickToSignUp: (event: any) => void;
    loading: boolean;
};

const SignInForm: React.FC<signInFormProps> = ({ onFinish, onFinishFailed, onClickToSignUp, loading }) => {
    const renderLinkToRegister = () => (
        <Link className='register__link' underline='hover' variant='inherit' onClick={onClickToSignUp}>
            Register instead
        </Link>
    );

    return (
        <div className='sign-in'>
            <Form
                className='sign-in__form'
                layout='vertical'
                size='large'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    className='sign-in__field'
                    label='Email'
                    name='email'
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        {
                            type: 'email',
                            message: 'Please enter the correct email!',
                        },
                    ]}
                >
                    <Input name='email' />
                </Form.Item>
                <Form.Item
                    className='sign-in__field'
                    label='Password'
                    name='password'
                    rules={[{ required: true, message: 'Please enter password!' }]}
                >
                    <Input.Password name='password' />
                </Form.Item>
                <LoadingButton
                    className='sign-in__button'
                    type='submit'
                    loading={loading}
                    variant='contained'
                    sx={{ margin: 2, marginBottom: 3 }}
                >
                    Sign in
                </LoadingButton>
                <Form.Item className='sign-in__register'>
                    <Typography className='register__label'>
                        Don`t have an account yet? {renderLinkToRegister()}
                    </Typography>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignInForm;
