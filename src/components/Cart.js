import React from 'react';

import CartContext from '../context/CartContextProvider';
import AuthContext from '../context/AuthContextProvider';

import classes from './Cart.module.css';
import CartModal from '../UI/CartModal';
import { CartItem } from './CartItem';
import { Button } from '../components/Button'
import { Link } from 'react-router-dom';

export const Cart = (props) => {
    const cartCtx = React.useContext(CartContext);
    const userCtx = React.useContext(AuthContext);

    // just in case verify total
    let totalCartValue = 0;
    for (let i of cartCtx.items) {
        totalCartValue += (i.price * i.amountRequested);
    }
    if (totalCartValue.toFixed(2) !== (cartCtx.totalAmount).toFixed(2)) {
        throw new Error("Total")
    }

    const cartItems = cartCtx.items.length === 0
        ? <h1 style={{ marginTop: ".5em" }}> is empty</h1>
        : (
            <ul className={classes['cart-items']}>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}       // pass whole obj as prop so we can increment/decrement amountRequested easier from child
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
                {cartCtx.items.length > 0 &&
                    <div className={classes['total-orderBtn']}>
                        <div style={{ width: "30%" }}></div>
                        <h2> Total: <span>£{(cartCtx.totalAmount).toFixed(2)}</span></h2>
                        <Link to="payment" style={{ width: "30%" }}>
                            <Button style={{ width: "100%" }}>Proceed to Order</Button>
                        </Link>
                    </div>
                }
                {cartItems}
            </div>
        </CartModal>
    );
};

