import { Link } from "react-router-dom";
import styles from "./Errors.module.css"


export default function UnderConstruction() {
    return (
        <div className={styles.errorDiv}>
            <h1 className={styles.errorTitle}>Under Construction</h1>
            <h2 className={styles.errorSubtitle}>
                <Link to="/admin"
                    className={styles.errorSubtitle}>Return to Admin Interface</Link></h2>
        </div>
    );
};

