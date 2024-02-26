import { useContext, useState } from 'react'

import AuthContext from '../context/AuthContextProvider';
import CartContext from '../context/CartContextProvider';

import { Button } from '../components/Button';
import classes from './Payment.module.css';
import { fetchAllOrders, placeOrder } from '../api/api';


export const Orders = async () => {
    const authCtx = useContext(AuthContext);
    console.log(authCtx);

    const response = await fetchAllOrders(authCtx.loggedInUserData.auth_token);
    const orders = response.data;
    console.log(orders)

    return (
        <h1>Nishto</h1>
    )

}
