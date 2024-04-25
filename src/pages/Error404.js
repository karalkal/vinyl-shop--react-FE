import { Link } from "react-router-dom";
import ErrorModal from "../modals/ErrorModal";
import { Button } from "../components/Button";


export default function PageNotFound() {
    return (
        <ErrorModal>
            <h1>Page not found.</h1>
            <Link to="/"><Button>Return to Homepage</Button></Link>
        </ErrorModal>
    );
};

