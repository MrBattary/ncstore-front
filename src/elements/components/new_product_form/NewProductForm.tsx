import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Modal, Select, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import countries from 'countries-list';
import { NormalPrice } from '../../../types/NormalPrice';
import Button from '@mui/material/Button';
import { Delete } from '@mui/icons-material';

import './style.css';

type newProductFormProps = {
    visible: boolean;
    confirmLoading: boolean;
    success: boolean;
    onFinish: (event: any) => void;
    onFinishFailed: (event: any) => void;
    onCancel: (event: any) => void;
};

const NewProductForm: React.FC<newProductFormProps> = ({
    visible,
    confirmLoading,
    success,
    onFinish,
    onFinishFailed,
    onCancel,
}) => {
    const countryCodes = Object.keys(countries.countries);
    // @ts-ignore
    const countryNames: string[] = countryCodes.map(code => countries.countries[code].name);

    const [normalPrices, setNormalPrices] = useState<NormalPrice[]>([]);
    const [filteredCountryNames, setFilteredCountryNames] = useState<string[]>(countryNames);

    const [form] = useForm();
    const [innerForm] = useForm();

    useEffect(() => {
        if (success) {
            form.resetFields();
            setNormalPrices([]);
            setFilteredCountryNames(countryNames);
        }
    }, [success, form, countryNames]);

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
    };

    const renderFilteredCountryNames = () => {
        return filteredCountryNames.map((countryName: string) => (
            <Select.Option key={countryName} value={countryName}>
                {countryName}
            </Select.Option>
        ));
    };

    return (
        <Modal
            visible={visible}
            confirmLoading={confirmLoading}
            onOk={form.submit}
            onCancel={onCancel}
            className='new-product-modal'
        >
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
                    rules={[
                        { required: true, message: 'Please enter the product name!' },
                        () => ({
                            validator(_, value) {
                                if (value.length <= 3) {
                                    return Promise.reject(new Error('Product name should be more than 3 symbols!'));
                                }
                                if (value.length >= 255) {
                                    return Promise.reject(new Error('Product name should be less than 255 symbols!'));
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input
                        name='productName'
                        minLength={4}
                        maxLength={254}
                        placeholder='Please enter the product name'
                    />
                </Form.Item>
                <Form.Item
                    required
                    className='form__field'
                    label='Product description'
                    name='productDescription'
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (value.length < 50) {
                                    return Promise.reject(
                                        new Error('Product description should be more than 49 symbols!')
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input.TextArea minLength={50} name='productDescription' />
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
