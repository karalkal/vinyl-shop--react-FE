import { useContext, useEffect, useState } from 'react';
import { Link, redirect } from 'react-router-dom';

import { verifyUserIsAdmin } from '../../api/api';
import styles from './AdminMenu.module.css';

import AuthContext from '../../context/AuthContextProvider';
import ErrorContext from '../../context/ErrorContextProvider';
import ErrorGeneric from '../../pages/ErrorGeneric';
import { SuspenseSpinner } from '../../modals/SuspenseSpinner';


export const AdminMenu = () => {
  const { loggedInUserData, isLoggedIn } = useContext(AuthContext);
  const { hasError, setHasError } = useContext(ErrorContext)
  const [userIsIndeedAdmin, setUserIsIndeedAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log(loggedInUserData)

  useEffect(() => {
    async function verifyTokenForAdminPrivileges() {

      const response = await verifyUserIsAdmin(loggedInUserData.auth_token);
      console.log(response.data);
      //  BE responds with req.user.is_admin from encrypted token -->> response.data will be true/false for is_admin 
      try {
        setUserIsIndeedAdmin(response.data);
      }
      catch (error) {
        setHasError("Expired token (or are you messing about?)");
      }
      finally {
        setIsLoading(false);
      }
    }
    // only fetch if Auth context data shows user is logged in, is admin and has token 
    // this is just preliminary check - data will be verified at BE afterwards
    if (isLoggedIn && loggedInUserData.is_admin === "Y" && loggedInUserData.auth_token) {
      verifyTokenForAdminPrivileges();
    } 
    else {
      setHasError("You don't have the correct privileges to access this route");
      return;
    }

  }, [loggedInUserData, isLoggedIn, setHasError]);


  return <>
    {loggedInUserData.auth_token    // if token -->> either spinner or menu
      ?
      <>
        {isLoading
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
      // Not logged in, if logged with incorrect credentials api will return false
      : <ErrorGeneric errMessage="Log in/register to continue" />
    }
  </>
}



