import React from 'react';
import { Form, Input } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import './style.css';
import { useTranslation } from 'react-i18next';

type signInFormProps = {
    onFinish: (event: any) => void;
    onFinishFailed: (event: any) => void;
    onClickToSignUp: (event: any) => void;
    loading: boolean;
};

const SignInForm: React.FC<signInFormProps> = ({ onFinish, onFinishFailed, onClickToSignUp, loading }) => {
    const { t } = useTranslation('signIn');

    const renderLinkToRegister = () => (
        <Link className='register__link' underline='hover' variant='inherit' onClick={onClickToSignUp}>
            {t('form.register.link')}
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
                    label={t('form.email.label')}
                    name='email'
                    rules={[
                        { required: true, message: t('form.email.required') },
                        {
                            type: 'email',
                            message: t('form.email.error'),
                        },
                    ]}
                >
                    <Input name='email' />
                </Form.Item>
                <Form.Item
                    className='sign-in__field'
                    label={t('form.password.label')}
                    name='password'
                    rules={[{ required: true, message: t('form.password.required') }]}
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
                    {t('form.submit.label')}
                </LoadingButton>
                <Form.Item className='sign-in__register'>
                    <Typography className='register__label'>
                        {t('form.register.text')} {renderLinkToRegister()}
                    </Typography>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignInForm;
