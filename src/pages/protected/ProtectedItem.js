import React, { useContext } from 'react'
import AdminModal from '../../modals/AdminModal'
import AuthContext from '../../context/AuthContextProvider';

import styles from "./ProtectedItem.module.css";
import { Button } from '../../components/Button';
import { deleteUser, updateUser } from '../../api/api';


export const ProtectedItem = () => {
    const { protectedData, loggedInUserData } = useContext(AuthContext);
    // Properties dataType: "singleUser", actionType: "VIEW" are attached to AuthContext
    // Depending on this we will render relevant modal, i.e. user, album etc.
    const { dataType, actionType } = protectedData;
    console.log("dataType, actionType", dataType, actionType);

    const [formData, setFormData] = React.useState(protectedData);

    const [itemHasUpdated, setItemHasUpdated] = React.useState(false)
    const [itemWasDeleted, setItemWasDeleted] = React.useState(false)

    // updating functions
    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await updateUser(loggedInUserData.auth_token, formData.id, formData);
        if (response.status === 200) {
            setItemHasUpdated(true);
        }
    };

    async function handleDelete(e) {
        e.preventDefault();
        const response = await deleteUser(loggedInUserData.auth_token, protectedData.id);
        if (response.status === 204) {
            setItemWasDeleted(true);
        }
    }


    if (itemHasUpdated) {
        return (
            <AdminModal>
                <div className={styles.messageDiv}>
                    <h1 className={styles.messageTitle}>Item updated successfully</h1>
                    <h1 className={styles.messageTitle}>Refresh screen or click view to verify</h1>
                </div>
            </AdminModal>)
    }

    if (itemWasDeleted) {
        return (
            <AdminModal>
                <div className={styles.messageDiv}>
                    <h1 className={styles.messageTitle}>Item deleted successfully</h1>
                    <h1 className={styles.messageTitle}>Refresh screen to verify</h1>
                </div>
            </AdminModal>)
    }

    if (dataType === "singleUser") {
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
                    <form className={styles.protectedItem} onSubmit={handleSubmit}>
                        <span>id: </span><input className={styles.data} type="text" onChange={handleChange} name="id" value={formData.id} />
                        <span>First name: </span><input className={styles.data} type="text" onChange={handleChange} name="f_name" value={formData.f_name} />
                        <span>Last name: </span><input className={styles.data} type="text" onChange={handleChange} name="l_name" value={formData.l_name} />
                        <span>Email: </span><input className={styles.data} type="email" onChange={handleChange} name="email" value={formData.email} />
                        <span>House Number: </span><input className={styles.data} type="text" onChange={handleChange} name="house_number" value={formData.house_number} />
                        <span>Street: </span><input className={styles.data} type="text" onChange={handleChange} name="street_name" value={formData.street_name} />
                        <span>City: </span><input className={styles.data} type="text" onChange={handleChange} name="city" value={formData.city} />
                        <span>Country: </span><input className={styles.data} type="text" onChange={handleChange} name="country" value={formData.country} />
                        <span>Admin: </span><input className={styles.data} type="text" onChange={handleChange} name="is_admin" value={formData.is_admin} />
                        <span>Contributor: </span><input className={styles.data} type="text" onChange={handleChange} name="is_contributor" value={formData.is_contributor} />

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

    else {
        return (
            <AdminModal>
                <h1>Not implemented yet </h1>
            </AdminModal>)
    }
}


// function UserEditForm(props) {
//     delete protectedData.dataType;
//     delete protectedData.actionType;

//     return (
//         <form className={styles.protectedItem} onSubmit={handleSubmit}>
//             <span className={styles.title}>id: </span><input className={styles.data} type="text" onChange={handleChange} name="id" value={formData.id} />
//             <span className={styles.title}>First name: </span><input className={styles.data} type="text" onChange={handleChange} name="f_name" value={formData.f_name} />
//             <span className={styles.title}>Last name: </span><input className={styles.data} type="text" onChange={handleChange} name="l_name" value={formData.l_name} />
//             <span className={styles.title}>Email: </span><input className={styles.data} type="email" onChange={handleChange} name="email" value={formData.email} />
//             <span className={styles.title}>Country: </span><input className={styles.data} type="text" onChange={handleChange} name="country" value={formData.country} />
//             <span className={styles.title}>City: </span><input className={styles.data} type="text" onChange={handleChange} name="city" value={formData.city} />
//             <span className={styles.title}>House Number: </span><input className={styles.data} type="text" onChange={handleChange} name="house_number" value={formData.house_number} />
//             <span className={styles.title}>Street: </span><input className={styles.data} type="text" onChange={handleChange} name="street_name" value={formData.street_name} />
//             <span className={styles.title}>Admin: </span><input className={styles.data} type="text" onChange={handleChange} name="is_admin" value={formData.is_admin} />
//             <span className={styles.title}>Contributor: </span><input className={styles.data} type="text" onChange={handleChange} name="is_contributor" value={formData.is_contributor} />

//             <Button style={{ marginBottom: "3em", marginTop: "1em", }}>Edit</Button>
//         </form>
//     )

// }
