import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { verifyUserIsAdmin } from '../../api/api';
import styles from './AdminMenu.module.css';

import AuthContext from '../../context/AuthContextProvider';
import ErrorContext from '../../context/ErrorContextProvider';
import ErrorGeneric from '../../pages/ErrorGeneric';


export const AdminMenu = () => {
  const { loggedInUserData, isLoggedIn } = useContext(AuthContext);
  const errCtx = useContext(ErrorContext)

  const userSaysTheyAreAdmin = loggedInUserData.is_admin;
  const authToken = loggedInUserData.auth_token;

  const [userIsIndeedAdmin, setUserIsIndeedAdmin] = useState(false);

  useEffect(() => {
    async function verifyTokenForAdminPrivileges() {
      try {
        console.log("trying...")
        const response = await verifyUserIsAdmin(authToken);
        console.log("response", response);
        setUserIsIndeedAdmin(response.data);
      } catch (error) {
        console.log(error.message)
        errCtx.setHasError(error.message);
      }
      //  BE respondes with req.user.is_admin from encrypted token -->> response.data will be true/false for is_admin 
    }
    if (authToken && userSaysTheyAreAdmin === "Y" && isLoggedIn) {      // a bit pointless to check all these probably?
      verifyTokenForAdminPrivileges(); // <-- only fetch if truthy token
    }
  }, [authToken, isLoggedIn, userSaysTheyAreAdmin]);


  return (
    <div className={styles.adminHeader}>
      <Link to="/users" className={styles.adminBtn}>Users</Link>
      <Link to="/orders" className={styles.adminBtn}>Orders</Link>
      <Link to="/bands" className={styles.adminBtn}>Bands</Link>
      <Link to="/genres" className={styles.adminBtn}>Genres</Link>
      <Link to="/labels" className={styles.adminBtn}>Labels</Link>
      <Link to="/albums" className={styles.adminBtn}>Albums</Link>
    </div>
  )
}


