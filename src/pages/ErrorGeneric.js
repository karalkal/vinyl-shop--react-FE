import { Link } from "react-router-dom";
import { useContext } from "react";
import ErrorContext from "../context/ErrorContextProvider";
import ErrorModal from "../modals/ErrorModal";
import { Button } from "../components/Button";


export default function ErrorGeneric(props) {
    const errCtx = useContext(ErrorContext)

    return (
        <ErrorModal>
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
        </ErrorModal>
    );
}
