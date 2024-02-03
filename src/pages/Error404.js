import { Link } from "react-router-dom";
import styles from "./Errors.module.css"


export default function PageNotFound() {
    return (
        <div className={styles.errorDiv}>
            <h1 className={styles.errorTitle}>Page not found.</h1>
            <h2 className={styles.errorSubtitle}>
                <Link to="/"
                    className={styles.errorSubtitle}>Return to Homepage</Link></h2>
        </div>
    );
};

