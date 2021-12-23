import React from 'react';
import { useTranslation } from 'react-i18next';

import { DatePicker, Form, Input } from 'antd';

type additionalFormItemsForSupplierPersonProps = {};

const AdditionalFormItemsForSupplierPerson: React.FC<additionalFormItemsForSupplierPersonProps> = () => {
    const { t } = useTranslation('signUp');

    return (
        <>
            <Form.Item
                className='sign-up__field'
                label={t('tabs.person.firstname.label')}
                name='firstName'
                rules={[{ required: true, message: t('tabs.person.firstname.required') }]}
            >
                <Input name='firstName' />
            </Form.Item>
            <Form.Item
                className='sign-up__field'
                label={t('tabs.person.lastname.label')}
                name='lastName'
                rules={[{ required: true, message: t('tabs.person.lastname.required') }]}
            >
                <Input name='lastName' />
            </Form.Item>
            <Form.Item
                className='sign-up__field'
                label={t('tabs.person.birthday.label')}
                name='birthday'
                rules={[{ required: true, message: t('tabs.person.birthday.required') }]}
            >
                <DatePicker
                    name='birthday'
                    format='YYYY-MM-DD'
                    disabledDate={today => !today || today.isAfter(new Date())}
                />
            </Form.Item>
        </>
    );
};

export default AdditionalFormItemsForSupplierPerson;
