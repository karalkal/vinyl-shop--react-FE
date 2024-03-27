import { useState, useContext, useEffect } from 'react'

import { Button } from '../../components/Button';
import classes from './Users.module.css';
import { fetchAllUsers } from '../../api/api';
import AuthContext from '../../context/AuthContextProvider';
import { AdminMenu } from './AdminMenu';
import { SuspenseSpinner } from '../../modals/SuspenseSpinner';
import ErrorGeneric from '../ErrorGeneric';


export const Users = () => {
  const { loggedInUserData } = useContext(AuthContext);
  const token = loggedInUserData.auth_token;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getAllUsers() {
      const response = await fetchAllUsers(token);
      setUsers(response);
    }
    if (token) {
      getAllUsers(); // <-- only fetch users if truthy token
    }
  }, [token]);


  // no token -> need to log in
  // token but:
  //     users is still null -> spinner
  //          not null but users.length is 0 -> message 
  //          users.length > 0 -> map results 
  // id, f_name, l_name, city, country
  return (<main>
    <AdminMenu />
    {token
      ? <div className={classes.usersDiv}>
        {!users
          ? <SuspenseSpinner />
          : <>
            {users.length === 0
              ? <h2> No users found</h2>
              : <>
                {users.map(user =>
                  <p key={user.id} className={classes.p}>{user.id} {user.f_name} {user.l_name} {user.city} {user.country}</p>
                )
                }
              </>
            }
          </>
        }
      </div>
      :
      <ErrorGeneric errMessage="Log in/register to continue" />
    }
  </main>
  )
}
