import React from 'react';

import classes from './CartItem.module.css';


export const CartItem = (props) => {
    console.log(props);
    const { name, band_name, colour, cover, format, id, price, release_year } = props.item

    // in this version I pass whole item obj as props so we can manipulate amount from this component
    return (
        <li className={classes['cart-item']}>
            <div>
                <h2>{name}</h2>
                <h2>{band_name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>£{price.toFixed(2)}</span>
                    <span className={classes.amount}>x {props.item.amount}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={() => props.onDecrement(props.item.id)}>−</button>
                <button onClick={() => props.onIncrement(props.item)}>+</button>
                <button onClick={() => props.onRemove(props.item.id)}><i className="fa-solid fa-trash"></i></button>
            </div>
        </li>
    );
};