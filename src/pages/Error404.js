import { Link } from "react-router-dom";
import ErrorInfoModal from "../modals/ErrorInfoModal";
import { Button } from "../components/Button";


export default function PageNotFound() {
    return (
        <ErrorInfoModal>
            <h1>Page not found.</h1>
            <Link to="/"><Button>Return to Homepage</Button></Link>
        </ErrorInfoModal>
    );
};

