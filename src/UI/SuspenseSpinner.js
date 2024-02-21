import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import classes from './SuspenseSpinner.module.css';


export const SuspenseSpinner = () => {
    return (
        <div className={classes.backdrop}>
            <div className={classes.suspenseDiv}>
                <ClipLoader color="var(--cool-gray)" />
                <p>Retrieving data, please wait.</p>
                <ClipLoader color="var(--cool-gray)" />
            </div>
        </div>
    )
}
