import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { verifyUserIsAdmin } from '../../api/api';
import styles from './AdminMenu.module.css';

import AuthContext from '../../context/AuthContextProvider';
import ErrorContext from '../../context/ErrorContextProvider';
import { SuspenseSpinner } from '../../modals/SuspenseSpinner';
import ErrorGeneric from '../ErrorGeneric';

export const AdminMenu = () => {
  const { loggedInUserData, isLoggedIn } = useContext(AuthContext);
  const { hasError, setHasError } = useContext(ErrorContext)
  const [userIsIndeedAdmin, setUserIsIndeedAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verifyTokenForAdminPrivileges() {
      try {
        console.log("trying with token...", loggedInUserData.auth_token);
        //  BE responds with req.user.is_admin from encrypted token -->> response.data will be true/false for is_admin 
        const response = await verifyUserIsAdmin(loggedInUserData.auth_token);
        response.data === true
          ? setUserIsIndeedAdmin(response.data)   // will be true
          : setHasError("Expired token (or are you messing about?)");
      }
      catch (error) {
        setHasError(error.message);
      }        // BE might return error if no token is sent to it

      finally {
        setIsLoading(false);
      }
    }

    if (isLoggedIn || loggedInUserData.auth_token || loggedInUserData.is_admin === "Y") {
      verifyTokenForAdminPrivileges();
    } else {
      console.log(isLoggedIn, loggedInUserData.auth_token, loggedInUserData);

      setHasError("Not authorized to access the route");
    }
  }, [loggedInUserData, isLoggedIn, setHasError, userIsIndeedAdmin, isLoading]);


  return <>
    {isLoading && !hasError
      ? <SuspenseSpinner />
      : <div className={styles.adminHeader}>
        <Link to="/users" className={styles.adminBtn}>Users</Link>
        <Link to="/orders" className={styles.adminBtn}>Orders</Link>
        <Link to="/bands" className={styles.adminBtn}>Bands</Link>
        <Link to="/genres" className={styles.adminBtn}>Genres</Link>
        <Link to="/labels" className={styles.adminBtn}>Labels</Link>
        <Link to="/albums" className={styles.adminBtn}>Albums</Link>
      </div>
    }
  </>
}



