import { useState, useContext, useEffect } from 'react';

import { IconContext } from 'react-icons';
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { IoTrashBinSharp } from "react-icons/io5";

import styles from './AdminPages.module.css';

import { fetchAllUsers, fetchUserById } from '../../api/api';

import AuthContext from '../../context/AuthContextProvider';
import ErrorContext from '../../context/ErrorContextProvider';
import { AdminMenu } from './AdminMenu';
import { SuspenseSpinner } from '../../modals/SuspenseSpinner';
import ErrorGeneric from '../ErrorGeneric';
import ErrorInfoModal from '../../modals/ErrorInfoModal';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';


export const Users = () => {
  const { loggedInUserData, setAdminModalVisible, setProtectedData } = useContext(AuthContext);
  const { hasError, setHasError } = useContext(ErrorContext);

  const token = loggedInUserData.auth_token;

  const [allUsersData, setAllUsersData] = useState(null);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await fetchAllUsers(token);
        setAllUsersData(response);
      } catch (error) {
        console.log("Error", error)
        setHasError(error.message);
        return
      }
    }
    if (token) {
      getAllUsers(); // <-- only fetch users if truthy token
    }
  }, [token]);

  // Apart from getting data to be rendered in the admin modal this function will set the 
  // item type to be viewed or edited e.g. user, album etc... and the type of action e.g. view, edit, 
  async function setUserDataAndEnableAdminModal(token, idOfUser, actionType) {
    const response = await fetchUserById(token, idOfUser);
    console.log(response);
    setProtectedData({
      dataType: "users",
      actionType,
      ...response
    })
    setAdminModalVisible(true);
  }


  return (<main>
    <AdminMenu />
    {token
      ? <div className={styles.usersDiv}>
        {!allUsersData
          ? <SuspenseSpinner />
          : <>
            {allUsersData.length === 0
              ? <ErrorInfoModal><h1>No users found</h1><Link to="/admin"><Button>Return to Admin Interface</Button></Link>
              </ErrorInfoModal>
              : <>
                {allUsersData.map(user =>
                  <li key={user.id} className={styles['single-item']}>
                    <div className={styles['data']}>
                      <p className={styles['data-primary']}><span>{user.id}</span> {user.f_name} {user.l_name} </p>
                      {(user.city || user.country) && <p className={styles['data-secondary']}>{user.city}, {user.country}</p>
                      }
                    </div>
                    <div className={styles['action-btns']}>
                      <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                        <button title="View" onClick={() => setUserDataAndEnableAdminModal(token, user.id, "VIEW")}>
                          <PiFileMagnifyingGlassFill />
                        </button>
                      </IconContext.Provider>
                      <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                        <button title="Edit" onClick={() => setUserDataAndEnableAdminModal(token, user.id, "EDIT")}>
                          <PiPencilSimpleLineFill />
                        </button>
                      </IconContext.Provider>
                      <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                        <button title="Delete" onClick={() => setUserDataAndEnableAdminModal(token, user.id, "DELETE")}>
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
