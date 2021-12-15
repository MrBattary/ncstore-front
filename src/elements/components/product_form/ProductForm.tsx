import React, {useEffect, useState} from 'react';

import {DatePicker, Form, Input, InputNumber, Modal, Select, Table} from 'antd';
import {useForm} from 'antd/es/form/Form';
import countries from 'countries-list';
import {NormalPrice} from '../../../types/NormalPrice';
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material';
import {Moment} from 'moment';
import moment from 'moment/moment';

import {DiscountPrice} from '../../../types/DiscountPrice';
import {ProductWithoutId} from '../../../types/ProductWithoutId';
import {ProductWithSupplier} from '../../../types/ProductWithSupplier';

import './style.css';

type newProductFormProps = {
    isDiscountForm: boolean;
    defaultValuesProduct: ProductWithoutId | ProductWithSupplier | null | undefined;
    categoriesList: Array<string>;
    visible: boolean;
    confirmLoading: boolean;
    success: boolean;
    onFinish: (event: any) => void;
    onFinishFailed: (event: any) => void;
    onCancel: (event: any) => void;
};

type InnerDiscountForm = {
    price: number;
    region: string;
    times: Moment[];
};

const ProductForm: React.FC<newProductFormProps> = ({
                                                        isDiscountForm,
                                                        defaultValuesProduct,
                                                        categoriesList,
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
    const [filteredCountryNamesForNormalPrices, setFilteredCountryNamesForNormalPrices] =
        useState<string[]>(countryNames);
    const [discountPrices, setDiscountPrices] = useState<DiscountPrice[]>([]);
    const [filteredCountryNamesForDiscountPrices, setFilteredCountryNamesForDiscountPrices] = useState<string[]>([]);

    const [form] = useForm();
    const [innerNormalPricesForm] = useForm();
    const [innerDiscountPricesForm] = useForm();

    useEffect(() => {
        if (defaultValuesProduct) {
            form.setFieldsValue({
                productName: defaultValuesProduct.productName,
                productDescription: defaultValuesProduct.productDescription,
                categoriesNames: defaultValuesProduct.categoriesNames,
            });
            setNormalPrices(defaultValuesProduct.normalPrices);
            filterAndSetFilteredCountryNamesForNormalPrices(defaultValuesProduct.normalPrices);
            if (isDiscountForm) {
                setDiscountPrices(defaultValuesProduct.discountPrices);
                filterAndSetFilteredCountryNamesForDiscountPrices(
                    defaultValuesProduct.discountPrices,
                    defaultValuesProduct.normalPrices,
                    defaultValuesProduct.discountPrices
                );
            }
        }
        // DO NOT REMOVE
        // eslint-disable-next-line
    }, [defaultValuesProduct]);

    useEffect(() => {
        if (success) {
            form.resetFields();
            setNormalPrices([]);
            setFilteredCountryNamesForNormalPrices(countryNames);
            setDiscountPrices([]);
            setFilteredCountryNamesForDiscountPrices([]);
        }
    }, [success, form, countryNames]);

    const normalPricesTableColumns = [
        {title: 'Country', rowKey: 'region', dataIndex: 'region'},
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
                    startIcon={<Delete/>}
                    onClick={e => {
                        handleRemoveRowFromNormalPricesTable(record.region, e);
                    }}
                >
                    Delete
                </Button>
            ),
        },
    ];

    const discountPricesTableColumns = [
        {title: 'Country', key: 'rowKey', dataIndex: 'region'},
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
        },
        {
            title: 'Start Time',
            key: 'startUtcTime',
            dataIndex: 'startUtcTime',
            render: (text: string) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
            title: 'End Time',
            key: 'endUtcTime',
            dataIndex: 'endUtcTime',
            render: (text: string) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
            title: 'Remove',
            dataIndex: '',
            key: 'x',
            render: (text: any, record: { region: string }) => (
                <Button
                    variant='outlined'
                    startIcon={<Delete/>}
                    onClick={e => {
                        handleRemoveRowFromDiscountPricesTable(record.region, e);
                    }}
                >
                    Delete
                </Button>
            ),
        },
    ];

    const filterAndSetFilteredCountryNamesForDiscountPrices = (
        discountPricesValue: DiscountPrice[],
        normalPricesValue: NormalPrice[],
        discountPricesOld: DiscountPrice[]
    ) => {
        setFilteredCountryNamesForDiscountPrices(() =>
            normalPricesValue
                .map(normalPrice => normalPrice.region)
                .filter(
                    (normalPriceRegion: string) =>
                        !discountPricesValue.some(discountPrice => discountPrice.region === normalPriceRegion)
                )
                .filter(
                    (newDiscountPrice: string) =>
                        !discountPricesOld.some(discountPrice => discountPrice.region === newDiscountPrice)
                )
        );
    };

    const filterAndSetFilteredCountryNamesForNormalPrices = (newNormalPrices: NormalPrice[]) => {
        setFilteredCountryNamesForNormalPrices(
            countryNames.filter(
                (countryName: string) => !newNormalPrices.some(normalPrice => normalPrice.region === countryName)
            )
        );
    };

    const filterDiscountPrices = (discountPricesValue: DiscountPrice[], normalPricesValue: NormalPrice[]) =>
        discountPricesValue.filter(discountPrice =>
            normalPricesValue.some(normalPriceValue => normalPriceValue.region === discountPrice.region)
        );

    const handleRemoveRowFromNormalPricesTable = (normalPriceRegion: string, e: any) => {
        e.preventDefault();
        const newNormalPrices = normalPrices.filter(normalPrice => normalPrice.region !== normalPriceRegion);
        setNormalPrices(newNormalPrices);
        filterAndSetFilteredCountryNamesForNormalPrices(newNormalPrices);
        const newDiscountPrices = filterDiscountPrices(discountPrices, newNormalPrices);
        filterAndSetFilteredCountryNamesForDiscountPrices(newDiscountPrices, newNormalPrices, newDiscountPrices);
        setDiscountPrices(newDiscountPrices);
    };

    const handleRemoveRowFromDiscountPricesTable = (discountPriceRegion: string, e: any) => {
        e.preventDefault();
        const newDiscountPrices = discountPrices.filter(discountPrice => discountPrice.region !== discountPriceRegion);
        setDiscountPrices(newDiscountPrices);
        setFilteredCountryNamesForDiscountPrices([...filteredCountryNamesForDiscountPrices, discountPriceRegion]);
    };

    const onFinishInnerNormalPricesForm = (value: NormalPrice) => {
        if (!normalPrices.some(normalPrice => normalPrice.region === value.region)) {
            const newNormalPrices = [...normalPrices, value];
            setNormalPrices(newNormalPrices);
            filterAndSetFilteredCountryNamesForNormalPrices(newNormalPrices);
            filterAndSetFilteredCountryNamesForDiscountPrices(discountPrices, newNormalPrices, discountPrices);
            innerNormalPricesForm.resetFields();
        }
    };

    const onFinishInnerDiscountPricesForm = (value: InnerDiscountForm) => {
        if (!discountPrices.some(discountPrice => discountPrice.region === value.region)) {
            const addedDiscountPrice: DiscountPrice = {
                price: value.price,
                region: value.region,
                startUtcTime: value.times[0].utc().format(),
                endUtcTime: value.times[1].utc().format(),
            };
            const newDiscountPrices = [...discountPrices, addedDiscountPrice];
            filterAndSetFilteredCountryNamesForDiscountPrices(newDiscountPrices, normalPrices, discountPrices);
            setDiscountPrices(newDiscountPrices);
            innerDiscountPricesForm.resetFields();
        }
    };

    const onFinishOuterForm = (e: any) => {
        onFinish({...e, normalPrices, discountPrices});
    };

    const renderFilteredCountryNamesForNormalPrices = () => {
        return filteredCountryNamesForNormalPrices.map((countryName: string) => (
            <Select.Option key={countryName} value={countryName}>
                {countryName}
            </Select.Option>
        ));
    };

    const renderFilteredCountryNamesForDiscountPrices = () => {
        return filteredCountryNamesForDiscountPrices.map((countryName: string) => (
            <Select.Option key={countryName} value={countryName}>
                {countryName}
            </Select.Option>
        ));
    };

    const renderCategories = () =>
        categoriesList.map((categoryName: string) => (
            <Select.Option key={categoryName} value={categoryName}>
                {categoryName}
            </Select.Option>
        ));

    const renderDiscountPricesForm = () => {
        if (isDiscountForm) {
            return (
                <>
                    <Form.Item className='form__field' label='Discount prices' name='discountPrices' required>
                        <Table<DiscountPrice>
                            columns={discountPricesTableColumns}
                            dataSource={discountPrices}
                            pagination={{pageSize: 20}}
                            scroll={{y: 240}}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form
                            form={innerDiscountPricesForm}
                            className='form__inner-form'
                            onFinish={onFinishInnerDiscountPricesForm}
                            onFinishFailed={() => {
                            }}
                            layout='inline'
                            size='large'
                        >
                            <Form.Item
                                className='inner-form__field'
                                label='Country'
                                name='region'
                                rules={[{required: true, message: 'Please enter the country!'}]}
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
                                    {renderFilteredCountryNamesForDiscountPrices()}
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
                                            const discountRegion = innerDiscountPricesForm.getFieldValue('region');
                                            let currentNormalPrice = normalPrices.find(
                                                normalPrice => normalPrice.region === discountRegion
                                            );
                                            if (Number.isInteger(value) && value >= 0 && currentNormalPrice) {
                                                if (
                                                    (currentNormalPrice.price === 0 && value === 0) ||
                                                    currentNormalPrice.price > value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                            }
                                            return Promise.reject(new Error('Enter the correct number!'));
                                        },
                                    }),
                                ]}
                                tooltip={
                                    <>
                                        <div className='field__tooltip'>
                                            The price must be an integer greater than or equal to zero. The discounted
                                            price should be less than the normal price.
                                        </div>
                                    </>
                                }
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                            <Form.Item
                                name='times'
                                className='inner-form__time-picker'
                                label='Start and end of discount'
                                rules={[{type: 'array' as const, required: true, message: 'Please select time!'}]}
                            >
                                <DatePicker.RangePicker
                                    showTime
                                    format='YYYY-MM-DD HH:mm:ss'
                                    disabledDate={today => !today || today.isBefore(new Date())}
                                />
                            </Form.Item>
                            <Form.Item className='inner-form__button'>
                                <Button
                                    variant={'outlined'}
                                    onClick={innerDiscountPricesForm.submit}
                                    sx={{marginTop: 2}}
                                >
                                    Add discount price
                                </Button>
                            </Form.Item>
                        </Form>
                    </Form.Item>
                </>
            );
        }
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
                        {required: true, message: 'Please enter the product name!'},
                        () => ({
                            validator(_, value) {
                                if (value.length <= 3) {
                                    return Promise.reject(
                                        new Error('CreateProduct name should be more than 3 symbols!')
                                    );
                                }
                                if (value.length >= 255) {
                                    return Promise.reject(
                                        new Error('CreateProduct name should be less than 255 symbols!')
                                    );
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
                                if (value.length <= 50) {
                                    return Promise.reject(
                                        new Error('CreateProduct description should be more than 50 symbols!')
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input.TextArea minLength={50} name='productDescription'/>
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
                        columns={normalPricesTableColumns}
                        dataSource={normalPrices}
                        pagination={{pageSize: 20}}
                        scroll={{y: 240}}
                    />
                </Form.Item>
                <Form.Item>
                    <Form
                        form={innerNormalPricesForm}
                        className='form__inner-form'
                        onFinish={onFinishInnerNormalPricesForm}
                        onFinishFailed={() => {
                        }}
                        layout='inline'
                        size='large'
                    >
                        <Form.Item
                            className='inner-form__field'
                            label='Country'
                            name='region'
                            rules={[{required: true, message: 'Please enter the country!'}]}
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
                                {renderFilteredCountryNamesForNormalPrices()}
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
                            <InputNumber min={0}/>
                        </Form.Item>
                        <Form.Item className='inner-form__button'>
                            <Button variant={'outlined'} onClick={innerNormalPricesForm.submit} sx={{marginTop: 2}}>
                                Add price
                            </Button>
                        </Form.Item>
                    </Form>
                </Form.Item>
                {renderDiscountPricesForm()}
                <Form.Item
                    className='form__field'
                    name='categoriesNames'
                    label='Categories'
                    rules={[{type: 'array'}]}
                >
                    <Select mode='multiple' placeholder='May you want to select categories'>
                        {renderCategories()}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default ProductForm;
