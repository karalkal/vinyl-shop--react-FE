import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthContextProvider';
import ErrorGeneric from './pages/ErrorGeneric';


const PrivateRoutes = () => {
    const authCtx = useContext(AuthContext);

    let isAdminAndHasToken = authCtx.loggedInUserData.is_admin === true && authCtx.isLoggedIn === true;

    return (
        isAdminAndHasToken ? <Outlet /> : <ErrorGeneric errMessage="Not authorized to access this route" />

    )
}

export default PrivateRoutes
