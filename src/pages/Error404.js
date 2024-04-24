import { Link } from "react-router-dom";
import styles from "./Errors.module.css";
import ErrorModal from "../modals/ErrorModal";


export default function PageNotFound() {
    return (
        <ErrorModal>
            <h1 className={styles.errorTitle}>Page not found.</h1>
            <h2 className={styles.errorSubtitle}>
                <Link to="/"
                    className={styles.errorSubtitle}>Return to Homepage</Link></h2>
        </ErrorModal>

    );
};

