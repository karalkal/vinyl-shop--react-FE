import React from 'react';
import classes from './Button.module.css';


export const Button = ({ children, style, onClick }) => {
    return (
        <button style={style} onClick={onClick}>
            {children}
        </button>
    );
};


