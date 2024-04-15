import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import styles from './SuspenseSpinner.module.css';


export const SuspenseSpinner = () => {
    return (
        <div className={styles.backdrop}>
            <div className={styles.suspenseDiv}>
                <ClipLoader color="var(--cool-gray)" />
                <p>Retrieving data, please wait.</p>
                <ClipLoader color="var(--cool-gray)" />
            </div>
        </div>
    )
}
