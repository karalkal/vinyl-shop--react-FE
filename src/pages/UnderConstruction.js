import { Link } from "react-router-dom";
import ErrorModal from "../modals/ErrorModal";
import { Button } from "../components/Button";


export default function UnderConstruction() {
    return (
        <ErrorModal>
            <h1>Under Construction.</h1>
            <Link to="/admin"><Button>Return to Admin Interface</Button></Link>
        </ErrorModal >
    );
};



