import { Link, useRouteError } from "react-router-dom";
import Header from "../components/Header";
import styles from "./Errors.module.css"

export default function ErrorGeneric() {

    const error = useRouteError()

    return (
        <>
            <Header accessToken={"Error"} selectedSubReddit={error.message} setSelectedCriterion={error.message} />
            <div className={styles.errorDiv}

                style={{
                    margin: "11px 44px 44px",
                    padding: "22px",
                    border: "8px solid var(--platinum)",
                    borderRadius: "11px",
                    boxShadow: "0px 0px 8px 8px var(--powder-blue)",
                }} >
                <h1 className={styles.errorTitle} >{error.message}</h1>
                <h2 className={styles.errorSubtitle}>
                    <Link to="/"
                        className={styles.errorSubtitle}>
                        Return to Homepage
                    </Link>
                    , Reload and Retry
                </h2>
            </div>
        </>
    );
};

