import React from 'react';
import { DatePicker, Form, Input } from 'antd';

type additionalFormItemsForSupplierPerson = {
};

const AdditionalFormItemsForSupplierPerson: React.FC<additionalFormItemsForSupplierPerson> = () => {

    return (
        <>
            <Form.Item
                className='sign-up__field'
                label='Firstname'
                name='firstName'
                rules={[{ required: true, message: 'Please enter your firstname!' }]}
            >
                <Input name='firstName' />
            </Form.Item>
            <Form.Item
                className='sign-up__field'
                label='Lastname'
                name='lastName'
                rules={[{ required: true, message: 'Please enter your lastname!' }]}
            >
                <Input name='lastName' />
            </Form.Item>
            <Form.Item
                className='sign-up__field'
                label='Birthday'
                name='birthday'
                rules={[{ required: true, message: 'Please select date!' }]}
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
