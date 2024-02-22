import React from 'react';

import CartContext from '../context/CartContextProvider';
import AuthContext from '../context/AuthContextProvider';

import classes from './Cart.module.css';
import CartModal from '../UI/CartModal';
import { CartItem } from './CartItem'

export const Cart = (props) => {
    const cartCtx = React.useContext(CartContext);
    const userCtx = React.useContext(AuthContext);

    const cartItems = cartCtx.items.length === 0
        ? <h1> is empty</h1>
        : (
            <ul className={classes['cart-items']}>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}       // pass whole obj as prop so we can increment/decrement amount easier from child
                    />
                ))}
            </ul>
        );

    return (
        <CartModal>
            <div className={classes.cartContainer}>
                {userCtx.loggedInUserData.first_name
                    ? <h1>User {userCtx.loggedInUserData.first_name}'s cart</h1>
                    : <h1>Your cart</h1>}

                {cartItems}
            </div>
        </CartModal>
    );
};

