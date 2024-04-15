import { useState, useContext, useEffect } from 'react';

import { IconContext } from 'react-icons';
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { IoTrashBinSharp } from "react-icons/io5";
import classes from './Users.module.css';

import { fetchAllUsers, fetchUserById } from '../../api/api';

import AuthContext from '../../context/AuthContextProvider';
import { AdminMenu } from './AdminMenu';
import { SuspenseSpinner } from '../../modals/SuspenseSpinner';
import ErrorGeneric from '../ErrorGeneric';
import AdminModal from '../../modals/AdminModal';


export const Users = () => {
  const { loggedInUserData, setAdminModalVisible } = useContext(AuthContext);
  const token = loggedInUserData.auth_token;
  const isAdminAccordingToLocalStorage = loggedInUserData.is_admin === "Y";

  const [allUsersData, setAllUsersData] = useState([]);
  const [singleUserData, setSingleUser] = useState({});

  useEffect(() => {
    async function getAllUsers() {
      const response = await fetchAllUsers(token);
      setAllUsersData(response);
    }
    if (token) {
      getAllUsers(); // <-- only fetch users if truthy token
    }
  }, [token]);



  async function displayUserData(token, idOfUser) {
    const response = await fetchUserById(token, idOfUser);
    console.log("data", response);
    setSingleUser(response);
    setAdminModalVisible(true);

    return (
      <AdminModal>
        <p>id: {singleUserData.id}</p>
        <p>{singleUserData.f_name}</p>
        <p>{singleUserData.l_name}</p>
        <p>{singleUserData.email}</p>
        <p>{singleUserData.street_name}</p>
        <p>{singleUserData.house_number}</p>
        <p>{singleUserData.is_admin}</p>
        <p>{singleUserData.is_contributor}</p>
        <p>{singleUserData.city}</p>
        <p>{singleUserData.country}</p>
      </AdminModal>)
  }



  return (<main>
    <AdminMenu />
    {token
      ? <div className={classes.usersDiv}>
        {!allUsersData
          ? <SuspenseSpinner />
          : <>
            {allUsersData.length === 0
              ? <h2> No users found</h2>
              : <>
                {allUsersData.map(user =>
                  <li key={user.id} className={classes['single-item']}>
                    <div className={classes['data']}>
                      <p className={classes['data-primary']}><span>{user.id}</span> {user.f_name} {user.l_name} </p>
                      {(user.city || user.country) && <p className={classes['data-secondary']}>{user.city}, {user.country}</p>
                      }
                    </div>
                    <div className={classes['action-btns']}>
                      <IconContext.Provider value={{ className: `${classes.reactIcons}` }}>
                        <button title="View" className={classes.btnRight} onClick={() => displayUserData(token, user.id)}>
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
