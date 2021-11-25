import { History } from 'history';
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../reducers/rootReducer';
import { getProduct } from '../../../actions/products/GetProduct';
import { restoreDefaultProductsReducer } from '../../../actions/products/RestoreDefaultProductsReducer';

type productProps = {
    history: History;
};

const Product: React.FC<productProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { productInfo, loading, errorMessage } = useSelector((state: AppState) => state.productsReducer);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage);
        }
    }, [enqueueSnackbar, errorMessage]);

    useEffect(() => {
        // /products/[fcfc45e7-47a2-45d5-86b7-cfcdf24a8016] - retrieves uuid
        dispatch(restoreDefaultProductsReducer());
        dispatch(getProduct(window.location.pathname.substr(10)));
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const renderProductData = () => {
        return (
            <>
                <h1>{productInfo?.productName}</h1>
            </>
        );
    };

    const renderProductNotFound = () => {
        return (
            <>
                <h1>NOT FOUND</h1>
            </>
        );
    };

    const renderProductContent = () => {
        if (productInfo) {
            return renderProductData();
        } else {
            return renderProductNotFound();
        }
    };

    if (loading) {
        return null;
    }
    return (
        <div className='product'>
            <div className='product__content'>{renderProductContent()}</div>
        </div>
    );
};

export default Product;
