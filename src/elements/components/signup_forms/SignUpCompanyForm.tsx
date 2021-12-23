import React, { useState } from 'react';

import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import { Checkbox, Col, DatePicker, Form, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import { UserRole } from '../../../types/UserRole';

import './style.css';
import { useTranslation } from 'react-i18next';

type signUpCompanyFormProps = {
    onFinish: (event: any) => void;
    onFinishFailed: (event: any) => void;
    onClickToSignIn: (event: any) => void;
    loading: boolean;
};

const SignUpCompanyForm: React.FC<signUpCompanyFormProps> = ({
    onFinish,
    onFinishFailed,
    onClickToSignIn,
    loading,
}) => {
    const { t } = useTranslation('signUp');

    const [rolesArray, setRolesArray] = useState<UserRole[]>([]);

    const checkRole = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setRolesArray([...rolesArray, UserRole[e.target.value as UserRole]]);
        } else {
            const roleIndex = rolesArray.indexOf(UserRole[e.target.value as UserRole]);
            if (roleIndex > -1) {
                setRolesArray(rolesArray.splice(roleIndex - 1, 1));
            }
        }
    };

    const renderLinkToLogin = () => (
        <Link className='login__link' underline='hover' variant='inherit' onClick={onClickToSignIn}>
            {t('tabs.common.register.link')}
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
                    label={t('tabs.common.email.label')}
                    name='email'
                    rules={[
                        { required: true, message: t('tabs.common.email.required') },
                        {
                            type: 'email',
                            message: t('tabs.common.email.error'),
                        },
                    ]}
                >
                    <Input name='email' />
                </Form.Item>
                <Form.Item
                    className='sign-up__field'
                    label={t('tabs.common.password.label')}
                    name='password'
                    rules={[
                        { required: true, message: t('tabs.common.password.required') },
                        { min: 8, message: t('tabs.common.password.error') },
                    ]}
                >
                    <Input.Password name='password' />
                </Form.Item>
                <Form.Item
                    className='sign-up__field'
                    label={t('tabs.common.passwordConfirm.label')}
                    name='password-confirm'
                    dependencies={['password']}
                    rules={[
                        { required: true, message: t('tabs.common.passwordConfirm.required') },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(t('tabs.common.passwordConfirm.error')));
                            },
                        }),
                    ]}
                >
                    <Input.Password name='password-confirm' />
                </Form.Item>
                <Form.Item
                    className='sign-up__field'
                    label={t('tabs.company.companyName.label')}
                    name='companyName'
                    rules={[{ required: true, message: t('tabs.company.companyName.required') }]}
                >
                    <Input name='companyName' />
                </Form.Item>
                <Form.Item
                    className='sign-up__field'
                    label={t('tabs.company.foundationDate.label')}
                    name='foundationDate'
                    rules={[{ required: false, message: t('tabs.company.foundationDate.required') }]}
                >
                    <DatePicker
                        name='foundationDate'
                        format='YYYY-MM-DD'
                        disabledDate={today => !today || today.isAfter(new Date())}
                    />
                </Form.Item>
                <Form.Item
                    className='sign-up__field'
                    label={t('tabs.common.roles.label')}
                    name='roles'
                    rules={[{ required: true, message: t('tabs.common.roles.error') }]}
                    tooltip={
                        <>
                            <div>{t('tabs.common.roles.help.first')}</div>
                            <div>{t('tabs.common.roles.help.second')}</div>
                        </>
                    }
                >
                    <Checkbox.Group>
                        <Col>
                            <Checkbox
                                onChange={checkRole}
                                checked={rolesArray.includes(UserRole.CUSTOMER)}
                                disabled={rolesArray.includes(UserRole.CUSTOMER) && rolesArray.length === 1}
                                value={UserRole.CUSTOMER}
                            >
                                {t('tabs.common.roles.customer')}
                            </Checkbox>
                            <Checkbox
                                onChange={checkRole}
                                checked={rolesArray.includes(UserRole.SUPPLIER)}
                                disabled={rolesArray.includes(UserRole.SUPPLIER) && rolesArray.length === 1}
                                value={UserRole.SUPPLIER}
                            >
                                {t('tabs.common.roles.supplier')}
                            </Checkbox>
                        </Col>
                    </Checkbox.Group>
                </Form.Item>
                <LoadingButton
                    className='sign-up__button'
                    type='submit'
                    loading={loading}
                    variant='contained'
                    sx={{ margin: 2, marginBottom: 3 }}
                >
                    {t('tabs.common.submit.label')}
                </LoadingButton>
                <Form.Item className='sign-up__login'>
                    <Typography className='login__label'>
                        {t('tabs.common.register.text')} {renderLinkToLogin()}
                    </Typography>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUpCompanyForm;
