import React from 'react';

import { IconContext } from "react-icons";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { RiDeleteBin3Line } from "react-icons/ri";


import classes from './CartItem.module.css';
import { Button } from './Button';


export const CartItem = (props) => {
    console.log(props);
    const { name, band_name, colour, cover,
        format, id, price, release_year,
        onDecrement,
        onIncrement,
        onRemove } = props.item

    // in this version I pass whole item obj as props so we can manipulate amount from this component
    return (
        <li className={classes['cart-item']}>
            <img className={classes['cover-image']} src={cover} />

            <div className={classes.details}>
                <p className={classes['album-name']}>{name}</p>
                <p className={classes['band-name']}>by {band_name}</p>
                <p className={classes['release-year']}>{release_year}</p>
                <p className={classes.price}>£{price.toFixed(2)}</p>
                {/* <p className={classes.amount}>x {props.item.amount}</p> */}
            </div>
            <div className={classes.actions}>
                <IconContext.Provider value={{ className: `${classes.reactIcons}` }}>
                    <button className={classes.btnRight}
                        onClick={() => onIncrement(id)}> <FaCirclePlus />
                    </button>
                </IconContext.Provider>

                <IconContext.Provider value={{ className: `${classes.reactIcons}` }}>
                    <button className={classes.btnRight}
                        onClick={() => onDecrement(id)}> <FaCircleMinus />
                    </button>
                </IconContext.Provider>

                <IconContext.Provider value={{ className: `${classes.reactIcons}` }}>
                    <button className={classes.btnRight}
                        onClick={() => onRemove(id)}> <RiDeleteBin3Line />
                    </button>
                </IconContext.Provider>

            </div>
        </li>
    );
};