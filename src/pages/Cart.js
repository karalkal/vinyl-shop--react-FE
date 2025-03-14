import React from 'react';

import CartContext from '../context/CartContextProvider';
import AuthContext from '../context/AuthContextProvider';

import styles from './Cart.module.css';
import CartModal from '../modals/CartModal';
import { CartItem } from '../components/CartItem';
import { Button } from '../components/Button'
import { Link } from 'react-router-dom';

export const Cart = (props) => {
    const cartCtx = React.useContext(CartContext);
    const authCtx = React.useContext(AuthContext);

    // just in case verify total
    let totalCartValue = 0;
    for (let i of cartCtx.items) {
        totalCartValue += (i.price * i.amountRequested);
    }
    if (totalCartValue.toFixed(2) !== (cartCtx.totalAmount).toFixed(2)) {
        throw new Error("Total does not match, check your code buddy!")
    }

    const cartItems = cartCtx.items.length === 0
        ? <h1 style={{ marginTop: ".5em" }}> is empty</h1>
        : (
            <ul className={styles['cart-items']}>
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
            <div className={styles.cartContainer}>
                {authCtx.loggedInUserData.first_name
                    ? <h1>User {authCtx.loggedInUserData.first_name}'s cart</h1>
                    : <h1>Your cart</h1>}
                {cartCtx.items.length > 0 &&
                    <div className={styles['cart-header']}>
                        <div style={{ width: "25%" }} onClick={() => cartCtx.emptyCart()}>
                            <Button style={{ width: "100%" }}>Empty Cart</Button>
                        </div>
                        <h2 style={{ width: "40%" }}> Total: <span>£{(cartCtx.totalAmount).toFixed(2)}</span></h2>
                        <Link to="payment" style={{ width: "25%" }} onClick={() => cartCtx.setCartModalVisible(false)}>
                            <Button style={{ width: "100%" }}>Proceed to Order</Button>
                        </Link>
                    </div>
                }
                {cartItems}
            </div>
        </CartModal>
    );
};

