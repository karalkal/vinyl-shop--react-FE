import React from 'react';

import { IconContext } from "react-icons";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { RiDeleteBin3Line } from "react-icons/ri";


import classes from './CartItem.module.css';


export const CartItem = (props) => {
    console.log(props);
    const { id, name, band_name, colour,
        cover, price, release_year,
        amount,         // quantity REQUESTED
        quantity,       // quantity AVAILABLE
        onDecrement,
        onIncrement,
        onRemove } = props.item

    // in this version I pass whole item obj as props so we can manipulate amount from this component
    return (
        <li className={classes['cart-item']}>
            <img className={classes['cover-image']} src={cover} alt={`cover of ${name} by ${band_name}`} />
            <div className={classes.details}>
                <div>
                    <p className={classes['album-name']}>{name}</p>
                    <p className={classes['band-name']}>by <span >{band_name}</span></p>
                    <p className={classes['year-color']}>{release_year}&nbsp;&nbsp;&#9899;&nbsp;&nbsp;{colour} vinyl</p>
                </div>
                <div>
                    <p className={classes.price}>{amount} &#215; £{price.toFixed(2)}</p>
                </div>
            </div>
            <div className={classes.actions}>
                <IconContext.Provider value={{ className: `${classes.reactIcons}` }}>
                    <button
                        onClick={() => onIncrement(id)}> <FaCirclePlus />
                    </button>
                </IconContext.Provider>

                <IconContext.Provider value={{ className: `${classes.reactIcons}` }}>
                    <button
                        onClick={() => onDecrement(id)}> <FaCircleMinus />
                    </button>
                </IconContext.Provider>

                <IconContext.Provider value={{ className: `${classes.reactIcons}` }}>
                    <button
                        onClick={() => onRemove(id)}> <RiDeleteBin3Line />
                    </button>
                </IconContext.Provider>

            </div>
        </li>
    );
};