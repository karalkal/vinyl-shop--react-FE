import { Link } from "react-router-dom";
import ErrorInfoModal from "../modals/ErrorInfoModal";
import { Button } from "../components/Button";


export default function UnderConstruction() {
    return (
        <ErrorInfoModal>
            <h1>Under Construction.</h1>
            <Link to="/admin"><Button>Return to Admin Interface</Button></Link>
        </ErrorInfoModal >
    );
};



