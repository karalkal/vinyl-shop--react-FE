import { useState, useContext, useEffect } from 'react';

import { IconContext } from 'react-icons';
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { IoTrashBinSharp } from "react-icons/io5";

import styles from './Users.module.css';

import { fetchAllBands, fetchBandById } from '../../api/api';

import AuthContext from '../../context/AuthContextProvider';
import ErrorContext from '../../context/ErrorContextProvider';
import { AdminMenu } from './AdminMenu';
import { SuspenseSpinner } from '../../modals/SuspenseSpinner';
import ErrorGeneric from '../ErrorGeneric';


export const Bands = () => {
  const { loggedInUserData, setAdminModalVisible, setProtectedData } = useContext(AuthContext);
  const { hasError, setHasError } = useContext(ErrorContext)
  const token = loggedInUserData.auth_token;

  const [allBandsData, setAllBandsData] = useState([]);

  useEffect(() => {
    async function getAllBands() {
      try {
        const response = await fetchAllBands(token);
        setAllBandsData(response);
      } catch (error) {
        console.log("Error", error)
        setHasError(error.message);
        return
      }
    }
    if (token) {
      getAllBands(); // <-- only fetch users if truthy token
    }
  }, [token]);

  // Apart from getting data to be rendered in the admin modal this function will set the 
  // item type to be viewed or edited e.g. user, album etc... and the type of action e.g. view, edit, 
  async function setBandsDataAndEnableAdminModal(token, idOfUser, actionType) {
    const response = await fetchBandById(token, idOfUser);
    console.log(response);
    setProtectedData({
      dataType: "bands",
      actionType,
      ...response
    })
    setAdminModalVisible(true);
  }


  return (<main>
    <AdminMenu />
    {token
      ? <div className={styles.usersDiv}>
        {!allBandsData
          ? <SuspenseSpinner />
          : <>
            {allBandsData.length === 0
              ? <h2> No bands found</h2>
              : <>
                {allBandsData.map(band =>
                  <li key={band.id} className={styles['single-item']}>
                    <div className={styles['data']}>
                      <p className={styles['data-primary']}><span>{band.id}</span> {band.name} </p>
                      <p className={styles['data-secondary']}>{band.country} </p>
                    </div>
                    <div className={styles['action-btns']}>
                      <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                        <button title="View" className={styles.btnRight} onClick={() => setBandsDataAndEnableAdminModal(token, band.id, "VIEW")}>
                          <PiFileMagnifyingGlassFill />
                        </button>
                      </IconContext.Provider>
                      <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                        <button title="Edit" className={styles.btnRight} onClick={() => setBandsDataAndEnableAdminModal(token, band.id, "EDIT")}>
                          <PiPencilSimpleLineFill />
                        </button>
                      </IconContext.Provider>
                      <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                        <button title="Delete" className={styles.btnRight} onClick={() => setBandsDataAndEnableAdminModal(token, band.id, "DELETE")}>
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
