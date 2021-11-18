import React, { useState } from 'react';
import { Form, Input, InputNumber, Modal, Select, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import countries from 'countries-list';
import { NormalPrice } from '../../../types/NormalPrice';
import Button from '@mui/material/Button';
import { Delete } from '@mui/icons-material';

import './style.css';

type newProductFormProps = {
    visible: boolean;
    onFinish: (event: any) => void;
    onFinishFailed: (event: any) => void;
    onCancel: (event: any) => void;
};

const NewProductForm: React.FC<newProductFormProps> = ({ visible, onFinish, onFinishFailed, onCancel }) => {
    const countryCodes = Object.keys(countries.countries);
    // @ts-ignore
    const countryNames: string[] = countryCodes.map(code => countries.countries[code].name);

    const [normalPrices, setNormalPrices] = useState<NormalPrice[]>([]);
    const [filteredCountryNames, setFilteredCountryNames] = useState<string[]>(countryNames);

    const [form] = useForm();
    const [innerForm] = useForm();

    const tableColumns = [
        { title: 'Country', key: 'region', dataIndex: 'region' },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
        },
        {
            title: 'Remove',
            dataIndex: '',
            key: 'x',
            render: (text: any, record: { region: string }) => (
                <Button
                    variant='outlined'
                    startIcon={<Delete />}
                    onClick={e => {
                        handleRemoveRow(record.region, e);
                    }}
                >
                    Delete
                </Button>
            ),
        },
    ];

    const filterAndSetFilteredCountryNames = (newNormalPrices: NormalPrice[]) => {
        setFilteredCountryNames(
            countryNames.filter(
                (countryName: string) => !newNormalPrices.some(normalPrice => normalPrice.region === countryName)
            )
        );
    };

    const handleRemoveRow = (region: string, e: any) => {
        e.preventDefault();
        const newNormalPrices = normalPrices.filter(normalPrice => normalPrice.region !== region);
        setNormalPrices(newNormalPrices);
        filterAndSetFilteredCountryNames(newNormalPrices);
    };

    const onFinishInnerForm = (value: NormalPrice) => {
        if (!normalPrices.some(normalPrice => normalPrice.region === value.region)) {
            const newNormalPrices = [...normalPrices, value];
            setNormalPrices(newNormalPrices);
            filterAndSetFilteredCountryNames(newNormalPrices);
            innerForm.resetFields();
        }
    };

    const onFinishOuterForm = (e: any) => {
        onFinish({ ...e, normalPrices });
        setNormalPrices([]);
        setFilteredCountryNames(countryNames);
        form.resetFields();
    };

    const renderFilteredCountryNames = () => {
        return filteredCountryNames.map((countryName: string) => (
            <Select key={countryName} value={countryName}>
                {countryName}
            </Select>
        ));
    };

    return (
        <Modal visible={visible} onOk={form.submit} onCancel={onCancel} className='new-product-modal'>
            <Form
                className='new-product-modal__form'
                form={form}
                onFinish={onFinishOuterForm}
                onFinishFailed={onFinishFailed}
                layout='vertical'
                size='large'
            >
                <Form.Item
                    className='form__field'
                    label='Product name'
                    name='productName'
                    rules={[{ required: true, message: 'Please enter the product name!' }]}
                >
                    <Input name='productName' placeholder='Please enter the product name' />
                </Form.Item>
                <Form.Item className='form__field' label='Product description' name='productDescription'>
                    <Input.TextArea name='productDescription' />
                </Form.Item>
                <Form.Item
                    className='form__field'
                    label='Parent product ID'
                    name='parentProductId'
                    tooltip={
                        <>
                            <div className='field__tooltip'>
                                If this software is additional to other software, then you can specify the ID of the
                                main software to increase sales.
                            </div>
                            <div className='field__tooltip'>For example ID: b3a45c91-6ae1-4a23-3650-9ceb5a1f8fc1</div>
                        </>
                    }
                >
                    <Input
                        name='parentProductId'
                        minLength={36}
                        maxLength={36}
                        placeholder='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
                    />
                </Form.Item>
                <Form.Item
                    className='form__field'
                    label='Prices'
                    name='normalPrices'
                    required
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (normalPrices.length <= 0) {
                                    return Promise.reject(new Error('Please enter at least one price!'));
                                }
                                if (!normalPrices.some(normalPrice => normalPrice.region === 'United States')) {
                                    return Promise.reject(
                                        new Error(
                                            'Please enter the price for the United States, because this is the default price!'
                                        )
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Table<NormalPrice>
                        columns={tableColumns}
                        dataSource={normalPrices}
                        pagination={{ pageSize: 20 }}
                        scroll={{ y: 240 }}
                    />
                </Form.Item>
                <Form.Item>
                    <Form
                        form={innerForm}
                        className='form__inner-form'
                        onFinish={onFinishInnerForm}
                        onFinishFailed={() => {}}
                        layout='inline'
                        size='large'
                    >
                        <Form.Item
                            className='inner-form__field'
                            label='Country'
                            name='region'
                            rules={[{ required: true, message: 'Please enter the country!' }]}
                        >
                            <Select
                                showSearch
                                optionFilterProp='children'
                                filterOption={(input, option) =>
                                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {renderFilteredCountryNames()}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Price'
                            name='price'
                            className='inner-form__field'
                            required
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (Number.isInteger(value) && value >= 0) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Enter the correct number!'));
                                    },
                                }),
                            ]}
                            tooltip={
                                <>
                                    <div className='field__tooltip'>
                                        The price must be an integer greater than or equal to zero.
                                    </div>
                                </>
                            }
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item className='inner-form__button'>
                            <Button variant={'outlined'} onClick={innerForm.submit} sx={{ marginTop: 2 }}>
                                Add price
                            </Button>
                        </Form.Item>
                    </Form>
                </Form.Item>
                <Form.Item
                    className='form__field'
                    name='categoriesNames'
                    label='Categories'
                    rules={[{ type: 'array' }]}
                >
                    <Select mode='multiple' placeholder='May you want to select categories'>
                        {/*TODO: Add categories*/}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default NewProductForm;
