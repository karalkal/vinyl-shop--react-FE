import { Link } from "react-router-dom";
import styles from "./Errors.module.css"
import { useContext } from "react";
import ErrorContext from "../context/ErrorContextProvider";

export default function ErrorGeneric(props) {
    const errCtx = useContext(ErrorContext)
    console.log("GENERIC ERROR", props)

    return (
        <div className={styles.errorDiv}>
            {props.errMessage
                ? <h1 className={styles.errorTitle}>
                    {props.errMessage}</h1>
                : <h1 className={styles.errorTitle}>
                    Something went wrong.</h1>
            }
            <h2 className={styles.errorSubtitle}>
                <Link to="/"
                    className={styles.errorSubtitle}
                    onClick={() => errCtx.hasError("")}>Return to Homepage</Link></h2>
        </div>
    );
}

/*

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

*/