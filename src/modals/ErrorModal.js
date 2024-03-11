import styles from './ErrorModal.module.css'

export default function ErrorModal({ handleClose, show, errorMsg }) {
    const showHideClassName = show
        ? `${styles.modal} ${styles.displayBlock}`
        : `${styles.modal} ${styles.displayNone}`;

    return (
        <div className={showHideClassName}>
            <section className={styles.modalMain}>
                <p>{errorMsg}</p>
                <button id={styles.modalBtn} type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div>
    );
};