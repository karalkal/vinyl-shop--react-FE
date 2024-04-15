import React from 'react';

import { IconContext } from "react-icons";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { RiDeleteBin3Line } from "react-icons/ri";

import styles from './CartItem.module.css';
import CartContext from '../context/CartContextProvider';


export const CartItem = (props) => {
    const { addItem, decrementItem, removeItem } = React.useContext(CartContext);
    // destructure props
    const { item } = props
    // then destructure item
    const { id, name, band_name, colour,
        cover, price, release_year,
        amountRequested,         // quantity REQUESTED
        quantity,       // quantity AVAILABLE
    } = item


    // in this version I pass whole item obj as props so we can manipulate amountRequested from this component
    return (
        <li className={styles['cart-item']}>
            <img className={styles['cover-image']} src={cover} alt={`cover of ${name} by ${band_name}`} />
            <div className={styles.details}>
                <div>
                    <p className={styles['album-name']}>{name}</p>
                    <p className={styles['band-name']}>by&nbsp;&nbsp;<span>{band_name}</span></p>
                    <p className={styles['year-color']}>{release_year}&nbsp;&nbsp;&#9899;&nbsp;&nbsp;{colour} vinyl</p>
                </div>
                <div>
                    <p className={styles.price}>{amountRequested} &#215; £{price.toFixed(2)}</p>
                </div>
            </div>
            <div className={styles.actions}>
                <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                    <button
                        onClick={() => addItem(item)}> <FaCirclePlus />
                    </button>
                </IconContext.Provider>

                <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                    <button
                        onClick={() => decrementItem(id)}> <FaCircleMinus />
                    </button>
                </IconContext.Provider>

                <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                    <button
                        onClick={() => removeItem(id)}> <RiDeleteBin3Line />
                    </button>
                </IconContext.Provider>

            </div>
        </li>
    );
};