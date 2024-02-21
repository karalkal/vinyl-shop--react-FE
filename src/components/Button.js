import React from 'react';
import classes from './Button.module.css';


export const Button = ({ children, style, onClick }) => {
    return (
        <button className={classes.btnGeneric} onClick={onClick} style={style}>
            {children}
        </button>
    );
};


