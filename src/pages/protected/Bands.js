import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { IoTrashBinSharp } from "react-icons/io5";
import { RiSave3Fill } from "react-icons/ri";

import styles from './AdminPages.module.css';

import { fetchAllBands, fetchBandById, createBand } from '../../api/api';

import AuthContext from '../../context/AuthContextProvider';
import ErrorContext from '../../context/ErrorContextProvider';
import { AdminMenu } from './AdminMenu';
import { SuspenseSpinner } from '../../modals/SuspenseSpinner';
import ErrorGeneric from '../ErrorGeneric';
import { Button } from '../../components/Button';
import ErrorInfoModal from '../../modals/ErrorInfoModal';


export const Bands = () => {
  const { loggedInUserData, setAdminModalVisible, setProtectedData } = useContext(AuthContext);
  const { hasError, setHasError } = useContext(ErrorContext)
  const token = loggedInUserData.auth_token;

  const [allBandsData, setAllBandsData] = useState(null);
  const [formData, setFormData] = useState({ name: '', country: '' });
  const [newBandWasCreated, setNewBandWasCreated] = useState(false);


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

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => {
      return { ...prevFormData, [name]: value }   // key is computed prop
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let response = null
    try {
      response = await createBand(loggedInUserData.auth_token, formData);
      if (response.status === 201) {
        setNewBandWasCreated(true);
      }
    }
    catch (error) {
      setHasError(error.message);
      return
    }
  };

  if (newBandWasCreated) {
    return (
      <ErrorInfoModal>
        <div className={styles.messageDiv}>
          <h1 className={styles.messageTitle}>Item created successfully</h1>
          <h1 className={styles.messageTitle}>Refresh screen or click view to verify</h1>
        </div>
      </ErrorInfoModal>)
  }


  return (<main>
    <AdminMenu />
    {token
      ? <div className={styles.usersDiv}>
        {!allBandsData
          ? <SuspenseSpinner />
          : <>
            {allBandsData.length === 0

              ? <ErrorInfoModal>
                <h1>No bands found</h1><Link to="/admin"><Button>Return to Admin Interface</Button></Link>
              </ErrorInfoModal>

              : <>
                <form className={styles['create-item-form']} onSubmit={handleSubmit}>
                  <div>
                    <p>Create</p>
                    <p>new entry:</p>
                  </div>
                  <input type="text" required placeholder="Name"
                    onChange={handleChange} name="name" value={formData.name} />
                  <input type="text" required placeholder="Country"
                    onChange={handleChange} name="country" value={formData.country} />
                  <div className={styles['action-btns']}>
                    <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                      <button title="Save" type="submit">
                        <RiSave3Fill />
                      </button>
                    </IconContext.Provider>
                  </div>
                </form>
                {/* ... and after the Create form map over all items and display them */}
                {allBandsData.map(band =>
                  <li key={band.id} className={styles['single-item']}>
                    <div className={styles['data']}>
                      <p className={styles['data-primary']}><span>{band.id}</span> {band.name} </p>
                      <p className={styles['data-secondary']}>{band.country} </p>
                    </div>
                    <div className={styles['action-btns']}>
                      <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                        <button title="View" onClick={() => setBandsDataAndEnableAdminModal(token, band.id, "VIEW")}>
                          <PiFileMagnifyingGlassFill />
                        </button>
                      </IconContext.Provider>
                      <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                        <button title="Edit" onClick={() => setBandsDataAndEnableAdminModal(token, band.id, "EDIT")}>
                          <PiPencilSimpleLineFill />
                        </button>
                      </IconContext.Provider>
                      <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                        <button title="Delete" onClick={() => setBandsDataAndEnableAdminModal(token, band.id, "DELETE")}>
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
