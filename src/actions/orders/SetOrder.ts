import { Dispatch } from 'redux';

import { SET_ORDER } from './orderActionTypes';
import { Order } from '../../types/Order';

export type SetOrder = {
    type: typeof SET_ORDER;
    payload: Order | null;
};

export const setOrder = (order: Order | null) => (dispatch: Dispatch<SetOrder>) => {
    dispatch({ type: SET_ORDER, payload: order });
};
