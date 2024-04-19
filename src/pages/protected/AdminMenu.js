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

  useEffect(() => {
    async function verifyTokenForAdminPrivileges() {
      //  BE responds with req.user.is_admin from encrypted token -->> response.data will be true/false for is_admin 
      try {
        const response = await verifyUserIsAdmin(loggedInUserData.auth_token);
        setUserIsIndeedAdmin(response.data);
      }
      catch (error) {
        setHasError("Expired token (or are you messing about?)");
        return
      }
      finally {
        setIsLoading(false);
      }
    }
    // only fetch if Auth context data shows user is logged in, is admin and has token 
    // this is just preliminary check - data will be verified at BE afterwards
    if (isLoggedIn && loggedInUserData.auth_token) {
      verifyTokenForAdminPrivileges();
    }

  }, [loggedInUserData, isLoggedIn, setHasError]);


  return <>
    {isLoggedIn    // if user is logged in -> either spinner or menu
      ?
      <>
        {isLoading
          ? <SuspenseSpinner />
          : { userIsIndeedAdmin } && <div className={styles.adminHeader}>
            <Link to="/admin/users" className={styles.adminBtn}>Users</Link>
            <Link to="/admin/orders" className={styles.adminBtn}>Orders</Link>
            <Link to="/admin/bands" className={styles.adminBtn}>Bands</Link>
            <Link to="/admin/genres" className={styles.adminBtn}>Genres</Link>
            <Link to="/admin/labels" className={styles.adminBtn}>Labels</Link>
            <Link to="/admin/albums" className={styles.adminBtn}>Albums</Link>
          </div>
        }
      </>
      // Not logged in, if logged with incorrect credentials api will return false
      : <ErrorGeneric errMessage="Log in/register to continue" />
    }
  </>
}



