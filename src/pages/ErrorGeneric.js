import { Link } from "react-router-dom";
import { useContext } from "react";
import ErrorContext from "../context/ErrorContextProvider";
import ErrorInfoModal from "../modals/ErrorInfoModal";
import { Button } from "../components/Button";


export default function ErrorGeneric(props) {
    const errCtx = useContext(ErrorContext)

    return (
        <ErrorInfoModal>
            {props.errMessage
                ? <h1>
                    {props.errMessage}</h1>
                : <h1>
                    Something went wrong.</h1>
            }
            <Link to="/"
                onClick={() => errCtx.hasError("")}>
                <Button>Return to Homepage</Button>
            </Link>
        </ErrorInfoModal>
    );
}
