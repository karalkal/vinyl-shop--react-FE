import React from 'react';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../context/CartContextProvider';
import { CartItem } from './CartItem'

export const Cart = (props) => {

    const ctx = React.useContext(CartContext);
    console.log(ctx)
    // utilize function addItem in context by passing object with same id and amount of 1
    function incrementItemHandler(item) {
        const incrementedMeal = {
            ...item,
            amount: 1
        }
        ctx.addItem(incrementedMeal)
    }


    function decrementItemHandler(itemID) {
        ctx.decrementItem(itemID)
    }

    function removeItemHandler(itemID) {
        ctx.removeItem(itemID)
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {ctx.items.map((item) => (
                <CartItem
                    key={item.id}
                    // name={item.name}
                    // price={item.price}
                    // amount={item.amount}
                    item={item}       // pass whole obj as prop so we can increment/decrement amount easier from child
                    onIncrement={incrementItemHandler}
                    onDecrement={decrementItemHandler}
                    onRemove={removeItemHandler}
                />
            ))}
        </ul>
    );


    return (
        <Modal onHideCart={props.onHideCart}>
            <h1>{cartItems}</h1>
        </Modal>
    );
};

