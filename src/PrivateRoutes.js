import { Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthContextProvider';
import ErrorGeneric from './pages/ErrorGeneric';
import { verifyUserIsAdmin } from './api/api';


const PrivateRoutes = () => {
    const { loggedInUserData, isLoggedIn } = useContext(AuthContext);
    const userSaysTheyAreAdmin = loggedInUserData.is_admin;
    const authToken = loggedInUserData.auth_token;
    console.log(userSaysTheyAreAdmin, isLoggedIn, authToken)

    const [userIsIndeedAdmin, setUserIsIndeedAdmin] = useState(false);

    useEffect(() => {
        async function getAllOrders() {
            const response = await checkIfIsAdminInToken(authToken);
            setUserIsIndeedAdmin(response.data);
        }
        if (authToken && userSaysTheyAreAdmin === "Y" && isLoggedIn) {      // a bit pointless to check all these probably?
            getAllOrders(); // <-- only fetch if truthy token
        }
    }, [authToken, isLoggedIn, userSaysTheyAreAdmin]);

    let isAdminAndHasToken = userIsIndeedAdmin === true;

    return (
        isAdminAndHasToken ? <Outlet /> : <ErrorGeneric errMessage="Not authorized to access this route" />

    )
}

async function checkIfIsAdminInToken(authToken) {
    return await verifyUserIsAdmin(authToken)

}

export default PrivateRoutes
