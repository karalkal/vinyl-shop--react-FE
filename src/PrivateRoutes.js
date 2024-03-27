import { Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthContextProvider';
import ErrorGeneric from './pages/ErrorGeneric';
import { verifyUserIsAdmin } from './api/api';


const PrivateRoutes = () => {
    const { loggedInUserData, isLoggedIn } = useContext(AuthContext);
    const userSaysTheyAreAdmin = loggedInUserData.is_admin;
    const authToken = loggedInUserData.auth_token;

    const [userIsIndeedAdmin, setUserIsIndeedAdmin] = useState(false);

    useEffect(() => {
        async function verifyTokenForAdminPrivileges() {
            const response = await verifyUserIsAdmin(authToken);
            //  BE respondes with req.user.is_admin from encrypted token -->> response.data will be true/false for is_admin 
            setUserIsIndeedAdmin(response.data);
        }
        if (authToken && userSaysTheyAreAdmin === "Y" && isLoggedIn) {      // a bit pointless to check all these probably?
            verifyTokenForAdminPrivileges(); // <-- only fetch if truthy token
        }
    }, [authToken, isLoggedIn, userSaysTheyAreAdmin]);

    let isAdminAndHasToken = userIsIndeedAdmin === true;

    return (
        isAdminAndHasToken ? <Outlet /> : <ErrorGeneric errMessage="Not authorized to access this route" />

    )
}


export default PrivateRoutes
