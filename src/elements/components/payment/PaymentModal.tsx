import React, {useEffect, useState} from 'react';

import {Modal} from "antd";
// @ts-ignore
import dropin from "braintree-web-drop-in"

type paymentModalProps = {
    isVisible: boolean;
    handleOk: (event: any, nonce: string) => void;
    handleCancel: (event: any) => void;
    paymentToken: string;
};

const PaymentModal: React.FC<paymentModalProps> = ({isVisible, handleOk, handleCancel, paymentToken}) => {

    const [braintreeInstance, setBraintreeInstance] = useState<any>(undefined)

    const initializeBraintree = () => dropin.create({
        authorization: paymentToken,
        container: '#braintree-drop-in-div',
    }, (error: any, instance: any) => {
        if (error) {
            console.error(error)
            handleCancel(null)
        } else
            setBraintreeInstance(instance);
    });

    useEffect(() => {
        if (isVisible && !braintreeInstance) {
            initializeBraintree()
        }
        // eslint-disable-next-line
    }, [isVisible])

    const handlePayment = (e: any) => {
        if (braintreeInstance) {
            braintreeInstance.requestPaymentMethod(
                (error: any, payload: any) => {
                    if (error) {
                        console.error(error);
                    } else {
                        const paymentMethodNonce = payload.nonce;
                        handleOk(e, paymentMethodNonce);
                    }
                })
        }
        handleOk(e, "");
    }

    return (
        <Modal visible={isVisible} onCancel={handleCancel} onOk={handlePayment}>
            <div id={"braintree-drop-in-div"}/>
        </Modal>
    );
};

export default PaymentModal;