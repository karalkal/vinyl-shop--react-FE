import React, { useState, useContext } from 'react'
import AdminModal from '../../modals/AdminModal'
import AuthContext from '../../context/AuthContextProvider';
import ErrorContext from '../../context/ErrorContextProvider';

import styles from "./ProtectedItem.module.css";
import { Button } from '../../components/Button';
import { deleteBand, deleteUser, updateBand, updateUser } from '../../api/api';
import ErrorInfoModal from '../../modals/ErrorInfoModal';


export const ProtectedItem = () => {
    const { hasError, setHasError } = useContext(ErrorContext);

    const { protectedData, loggedInUserData, setProtectedData } = useContext(AuthContext);
    // Properties dataType: "users", actionType: "VIEW" are attached to AuthContext
    // Depending on this render relevant modal, i.e. user, album etc.
    let { dataType, actionType } = protectedData;

    const [formData, setFormData] = useState(protectedData);

    const [itemHasUpdated, setItemHasUpdated] = useState(false);
    const [itemWasDeleted, setItemWasDeleted] = useState(false);


    // updating functions
    function handleFormChange(event) {
        const { name, value, type, checked } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    async function handleUpdate(e) {
        e.preventDefault();
        let response = null
        try {
            if (dataType === "users") {
                response = await updateUser(loggedInUserData.auth_token, formData.id, formData);
            }
            else if (dataType === "bands") {
                response = await updateBand(loggedInUserData.auth_token, formData.id, formData);
            }

            if (response.status === 200) {
                setItemHasUpdated(true);
            }
        } catch (error) {
            setHasError(error.message);
            return
        }
    };

    async function handleDelete(e) {
        e.preventDefault();
        let response = null
        try {
            if (dataType === "users") {
                response = await deleteUser(loggedInUserData.auth_token, protectedData.id);
            }
            else if (dataType === "bands") {
                response = await deleteBand(loggedInUserData.auth_token, protectedData.id);
            }

            if (response.status === 204) {
                setItemWasDeleted(true);
            }
        } catch (error) {
            setHasError(error.message);
            return
        }
    };

    function resetPageWithoutModals() {
        setItemHasUpdated(false);
        setItemWasDeleted(false);
        setProtectedData({});
        window.location.reload();
    }

    if (itemHasUpdated) {
        return (
            <ErrorInfoModal>
                <div className={styles.messageDiv}>
                    <h1 className={styles.messageTitle}>Item updated successfully</h1>
                    {/* <h1 className={styles.messageTitle}>Refresh screen or click view to verify</h1> */}
                    <Button onClick={resetPageWithoutModals}>Refresh</Button>
                </div>
            </ErrorInfoModal >)
    }

    if (itemWasDeleted) {
        return (
            <AdminModal>
                <div className={styles.messageDiv}>
                    <h1 className={styles.messageTitle}>Item deleted successfully</h1>
                    <Button onClick={resetPageWithoutModals}>Refresh</Button>
                </div>
            </AdminModal>)
    }

    if (dataType === "users") {
        return (
            <AdminModal>

                {actionType === "VIEW" && (
                    <div className={styles.protectedItem}>
                        <span>id: </span><span className={styles.data}>{protectedData.id}</span>
                        <span>First name: </span><span className={styles.data}>{protectedData.f_name}</span>
                        <span>Last name: </span><span className={styles.data}>{protectedData.l_name}</span>
                        <span>Email: </span><span className={styles.data}>{protectedData.email}</span>
                        <span>House Number </span><span className={styles.data}>{protectedData.house_number || "not supplied"}</span>
                        <span>Street: </span><span className={styles.data}>{protectedData.street_name || "not supplied"}</span>
                        <span>City: </span><span className={styles.data}>{protectedData.city || "not supplied"}</span>
                        <span>Country: </span><span className={styles.data}>{protectedData.country || "not supplied"}</span>
                        <span>Admin: </span><span className={styles.data}>{protectedData.is_admin ? "YES" : "NO"}</span>
                        <span>Contributor: </span><span className={styles.data}>{protectedData.is_contributor ? "YES" : "NO"}</span>
                    </div>)
                }

                {actionType === "EDIT" && (
                    <form className={styles.protectedItem} onSubmit={handleUpdate}>
                        <span>id: </span><input className={styles.data} type="text" onChange={handleFormChange} name="id" value={formData.id} />
                        <span>First name: </span><input className={styles.data} type="text" onChange={handleFormChange} name="f_name" value={formData.f_name} />
                        <span>Last name: </span><input className={styles.data} type="text" onChange={handleFormChange} name="l_name" value={formData.l_name} />
                        <span>Email: </span><input className={styles.data} type="email" onChange={handleFormChange} name="email" value={formData.email} />
                        <span>House Number: </span><input className={styles.data} type="text" onChange={handleFormChange} name="house_number" value={formData.house_number} />
                        <span>Street: </span><input className={styles.data} type="text" onChange={handleFormChange} name="street_name" value={formData.street_name} />
                        <span>City: </span><input className={styles.data} type="text" onChange={handleFormChange} name="city" value={formData.city} />
                        <span>Country: </span><input className={styles.data} type="text" onChange={handleFormChange} name="country" value={formData.country} />
                        <span>Admin: </span><input className={styles.data} type="text" onChange={handleFormChange} name="is_admin" value={formData.is_admin} />
                        <span>Contributor: </span><input className={styles.data} type="text" onChange={handleFormChange} name="is_contributor" value={formData.is_contributor} />

                        <Button style={{ marginBottom: "3em", marginTop: "1em", }}>Edit</Button>
                    </form>)}

                {actionType === "DELETE" && (
                    <form className={styles.protectedItem} onSubmit={handleDelete}>
                        <span>id: </span><input className={styles.data} type="text" value={formData.id} readOnly={true} />
                        <span>First name: </span><input className={styles.data} type="text" value={formData.f_name} readOnly={true} />
                        <span>Last name: </span><input className={styles.data} type="text" value={formData.l_name} readOnly={true} />
                        <span>Email: </span><input className={styles.data} type="email" value={formData.email} readOnly={true} />
                        <span>House Number: </span><input className={styles.data} type="text" value={formData.house_number} readOnly={true} />
                        <span>Street: </span><input className={styles.data} type="text" value={formData.street_name} readOnly={true} />
                        <span>City: </span><input className={styles.data} type="text" value={formData.city} readOnly={true} />
                        <span>Country: </span><input className={styles.data} type="text" value={formData.country} readOnly={true} />
                        <span>Admin: </span><input className={styles.data} type="text" value={formData.is_admin} readOnly={true} />
                        <span>Contributor: </span><input className={styles.data} type="text" value={formData.is_contributor} readOnly={true} />

                        <Button style={{ marginBottom: "3em", marginTop: "1em", }}>Delete</Button>
                    </form>)}



            </AdminModal>)
    }

    else if (dataType === "bands") {
        return (
            <AdminModal>

                {actionType === "VIEW" && (
                    <div className={styles.protectedItem}>
                        <span>id: </span><span className={styles.data}>{protectedData.id}</span>
                        <span>Name: </span><span className={styles.data}>{protectedData.name}</span>
                        <span>Country of origin: </span><span className={styles.data}>{protectedData.country}</span>
                    </div>)
                }

                {actionType === "EDIT" && (
                    <form className={styles.protectedItem} onSubmit={handleUpdate}>
                        <span>id: </span><input className={styles.data} type="text" onChange={handleFormChange} name="id" value={formData.id} />
                        <span>Name: </span><input className={styles.data} type="text" onChange={handleFormChange} name="name" value={formData.name} />
                        <span>Country of origin: </span><input className={styles.data} type="text" onChange={handleFormChange} name="country" value={formData.country} />

                        <Button style={{ marginBottom: "3em", marginTop: "1em", }}>Edit</Button>
                    </form>)}

                {actionType === "DELETE" && (
                    <form className={styles.protectedItem} onSubmit={handleDelete}>
                        <span>id: </span><input className={styles.data} type="text" value={formData.id} readOnly={true} />
                        <span>Name: </span><input className={styles.data} type="text" value={formData.name} readOnly={true} />
                        <span>Country of origin: </span><input className={styles.data} type="text" value={formData.country} readOnly={true} />

                        <Button style={{ marginBottom: "3em", marginTop: "1em", }}>Delete</Button>
                    </form>)}


            </AdminModal>)
    }


}

