import React from 'react';

import './style.css';

type productButtonProps = {
    productName: string;
    productPrice: number;
    priceCurrency: string;
    onClick: (event: React.MouseEvent) => void;
};

const ProductButton: React.FC<productButtonProps> = ({ productName, productPrice, priceCurrency, onClick }) => {
    const goToProduct = (e: React.MouseEvent) => {
        onClick(e);
    };

    const renderContent = () => (
        <>
            <div className='product-button__image' />
            <div className='product-button__info'>
                <h1 className='info__name'>{productName}</h1>
                <h2 className='info__price'>
                    {productPrice.toString()} {priceCurrency}
                </h2>
            </div>
        </>
    );

    return (
        <div className='product-button' onClick={goToProduct}>
            {renderContent}
        </div>
    );
};

export default ProductButton;
