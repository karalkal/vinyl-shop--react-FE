import React from 'react';
import Modal from './Modal';
import ClipLoader from "react-spinners/ClipLoader";
import classes from './SuspenseSpinner.module.css';


export const SuspenseSpinner = () => {
    console.log("Loading modal appeared!")
    return (
        <Modal>
            <div className={classes.suspenseDiv}>
                <ClipLoader color="var(--cool-gray)" />
                <p>DB spins up, please wait.</p>
                <ClipLoader color="var(--cool-gray)" />
            </div >
        </Modal>
    )
}
