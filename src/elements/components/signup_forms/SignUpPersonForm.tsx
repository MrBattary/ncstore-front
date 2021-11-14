import React from 'react';
import Link from '@mui/material/Link';
import { Form, Input } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

type signUpPersonFormProps = {
    onFinish: (event: any) => void;
    onFinishFailed: (event: any) => void;
    onClickToSignIn: (event: any) => void;
    loading: boolean;
};

const SignUpPersonForm: React.FC<signUpPersonFormProps> = ({ onFinish, onFinishFailed, onClickToSignIn, loading }) => {
    const renderLinkToLogin = () => (
        <Link className='login__link' underline='hover' variant='inherit' onClick={onClickToSignIn}>
            Sign in instead
        </Link>
    );

    return (
        <div className='sign-up'>
            <Form
                className='sign-up__form'
                layout='vertical'
                size='large'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    className='sign-up__field'
                    label='Email'
                    name='email'
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input name='email' />
                </Form.Item>
                <Form.Item
                    className='sign-up__field'
                    label='Password'
                    name='password'
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password name='password' />
                </Form.Item>
                <LoadingButton
                    className='sign-up__button'
                    type='submit'
                    loading={loading}
                    variant='contained'
                    sx={{ margin: 2, marginBottom: 3 }}
                >
                    Sign up
                </LoadingButton>
                <Form.Item className='sign-up__login'>
                    <Typography className='login__label'>Already have an account? {renderLinkToLogin()}</Typography>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUpPersonForm;
