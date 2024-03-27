import { useState, useContext, useEffect } from 'react';

import { fetchAllUsers } from '../../api/api';

import classes from './Users.module.css';
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { IoTrashBinSharp } from "react-icons/io5";
import { Button } from '../../components/Button';

import AuthContext from '../../context/AuthContextProvider';
import { AdminMenu } from './AdminMenu';
import { SuspenseSpinner } from '../../modals/SuspenseSpinner';
import ErrorGeneric from '../ErrorGeneric';
import { IconContext } from 'react-icons';


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
                  <li key={user.id} className={classes['single-item']}>
                    <div className={classes['data']}>
                      <p className={classes['data-primary']}><span>{user.id}</span> {user.f_name} {user.l_name} </p>
                      {(user.city || user.country) && <p className={classes['data-secondary']}>{user.city}, {user.country}</p>
                      }
                    </div>
                    <div className={classes['action-btns']}>
                      <IconContext.Provider value={{ className: `${classes.reactIcons}` }}>
                        <button title="View" className={classes.btnRight} onClick={() => console.log(true)}>
                          <PiFileMagnifyingGlassFill />
                        </button>
                      </IconContext.Provider>
                      <IconContext.Provider value={{ className: `${classes.reactIcons}` }}>
                        <button title="Edit" className={classes.btnRight} onClick={() => console.log(true)}>
                          <PiPencilSimpleLineFill />
                        </button>
                      </IconContext.Provider>
                      <IconContext.Provider value={{ className: `${classes.reactIcons}` }}>
                        <button title="Delete" className={classes.btnRight} onClick={() => console.log(true)}>
                          <IoTrashBinSharp />
                        </button>
                      </IconContext.Provider>

                    </div>
                  </li>
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
