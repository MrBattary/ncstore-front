import React, { useState } from 'react';

import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import { Checkbox, Col, DatePicker, Form, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import { UserRole } from '../../../types/UserRole';

import './style.css';

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
                    rules={[{ required: true, message: 'Please input company email!' }]}
                >
                    <Input name='email' />
                </Form.Item>
                <Form.Item
                    className='sign-up__field'
                    label='Password'
                    name='password'
                    rules={[{ required: true, message: 'Please input password!' }]}
                >
                    <Input.Password name='password' />
                </Form.Item>
                <Form.Item
                    className='sign-up__field'
                    label='Confirm Password'
                    name='password-confirm'
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password name='password-confirm' />
                </Form.Item>
                <Form.Item
                    className='sign-up__field'
                    label='Company Name'
                    name='companyName'
                    rules={[{ required: true, message: 'Please input company name!' }]}
                >
                    <Input name='companyName' />
                </Form.Item>
                <Form.Item
                    className='sign-up__field'
                    label='Company Foundation Date'
                    name='foundationDate'
                    rules={[{ required: false, message: 'Please select date!' }]}
                >
                    <DatePicker name='foundationDate' format='YYYY-MM-DD' />
                </Form.Item>
                <Form.Item
                    className='sign-up__field'
                    label='Roles'
                    name='roles'
                    rules={[{ required: true, message: 'Please choose at least one role!' }]}
                    tooltip={
                        <>
                            <div>Customer - can purchase software</div>
                            <div>Supplier - can sell software, but additional information may be required</div>
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
                                Customer
                            </Checkbox>
                            <Checkbox
                                onChange={checkRole}
                                checked={rolesArray.includes(UserRole.SUPPLIER)}
                                disabled={rolesArray.includes(UserRole.SUPPLIER) && rolesArray.length === 1}
                                value={UserRole.SUPPLIER}
                            >
                                Supplier
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
                    Sign up
                </LoadingButton>
                <Form.Item className='sign-up__login'>
                    <Typography className='login__label'>Already have an account? {renderLinkToLogin()}</Typography>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUpCompanyForm;
