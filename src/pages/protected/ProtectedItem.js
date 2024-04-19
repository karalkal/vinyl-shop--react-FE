import React, { useContext } from 'react'
import AdminModal from '../../modals/AdminModal'
import AuthContext from '../../context/AuthContextProvider';

import styles from "./ProtectedItem.module.css";
import { Button } from '../../components/Button';
import { updateUser } from '../../api/api';


export const ProtectedItem = () => {
    const { protectedData, loggedInUserData } = useContext(AuthContext);
    console.log(protectedData)
    // Properties dataType: "singleUser", actionType: "VIEW" are attached to AuthContext
    // Depending on this we will render relevant modal, i.e. user, album etc.
    if (protectedData.dataType === "singleUser") {
        if (protectedData.actionType === "VIEW") {
            return (
                <AdminModal>
                    <div className={styles.protectedItem}>
                        <span className={styles.title}>id: </span><span className={styles.data}>{protectedData.id}</span>
                        <span className={styles.title}>First name: </span><span className={styles.data}>{protectedData.f_name}</span>
                        <span className={styles.title}>Last name: </span><span className={styles.data}>{protectedData.l_name}</span>
                        <span className={styles.title}>Email: </span><span className={styles.data}>{protectedData.email}</span>
                        <span className={styles.title}>Country: </span><span className={styles.data}>{protectedData.country || "not supplied"}</span>
                        <span className={styles.title}>City: </span><span className={styles.data}>{protectedData.city || "not supplied"}</span>
                        <span className={styles.title}>House Number </span><span className={styles.data}>{protectedData.house_number || "not supplied"}</span>
                        <span className={styles.title}>Street: </span><span className={styles.data}>{protectedData.street_name || "not supplied"}</span>
                        <span className={styles.title}>Admin: </span><span className={styles.data}>{protectedData.is_admin ? "YES" : "NO"}</span>
                        <span className={styles.title}>Contributor: </span><span className={styles.data}>{protectedData.is_contributor ? "YES" : "NO"}</span>
                    </div>
                </AdminModal>)
        }
        if (protectedData.actionType === "EDIT") {
            return (
                <AdminModal>
                    <UserEditForm protectedData={protectedData} loggedInUserData={loggedInUserData}/>
                </AdminModal>)
        }
    }
    else {
        return (<AdminModal>
            <h1>Not implemented yet </h1>
        </AdminModal>)
    }
}


function UserEditForm(props) {
    const { protectedData, loggedInUserData } = props;
    delete protectedData.dataType;
    delete protectedData.actionType;
    const [formData, setFormData] = React.useState(protectedData);


    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    console.log("form data", formData)


    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData)

        const response = await updateUser(loggedInUserData.auth_token, formData.id, formData);
        console.log(response);
    };

    return (
        <form className={styles.protectedItem} onSubmit={handleSubmit}>
            <span className={styles.title}>id: </span><input className={styles.data} type="text" onChange={handleChange} name="id" value={formData.id} />
            <span className={styles.title}>First name: </span><input className={styles.data} type="text" onChange={handleChange} name="f_name" value={formData.f_name} />
            <span className={styles.title}>Last name: </span><input className={styles.data} type="text" onChange={handleChange} name="l_name" value={formData.l_name} />
            <span className={styles.title}>Email: </span><input className={styles.data} type="email" onChange={handleChange} name="email" value={formData.email} />
            <span className={styles.title}>Country: </span><input className={styles.data} type="text" onChange={handleChange} name="country" value={formData.country} />
            <span className={styles.title}>City: </span><input className={styles.data} type="text" onChange={handleChange} name="city" value={formData.city} />
            <span className={styles.title}>House Number: </span><input className={styles.data} type="text" onChange={handleChange} name="house_number" value={formData.house_number} />
            <span className={styles.title}>Street: </span><input className={styles.data} type="text" onChange={handleChange} name="street_name" value={formData.street_name} />
            <span className={styles.title}>Admin: </span><input className={styles.data} type="text" onChange={handleChange} name="is_admin" value={formData.is_admin} />
            <span className={styles.title}>Contributor: </span><input className={styles.data} type="text" onChange={handleChange} name="is_contributor" value={formData.is_contributor} />

            <Button className="form--submit" >Edit</Button>
        </form>
    )

}
