import React, { useContext } from 'react'
import AdminModal from '../../modals/AdminModal'
import AuthContext from '../../context/AuthContextProvider';

import styles from "./ProtectedItem.module.css";

export const ProtectedItem = () => {
    const { protectedData } = useContext(AuthContext);
    console.log(protectedData);

    if (protectedData.dataType === "singleUser") {
        return (
            <AdminModal>
                <div className={styles.ProtectedItem}>
                    <p>id: {protectedData.id}</p>
                    <p>First name: {protectedData.f_name}</p>
                    <p>Last name: {protectedData.l_name}</p>
                    <p>Email: {protectedData.email}</p>
                    <p>Country: {protectedData.country || "not supplied"}</p>
                    <p>City: {protectedData.city || "not supplied"}</p>
                    <p>House Number {protectedData.house_number || "not supplied"}</p>
                    <p>Street: {protectedData.street_name || "not supplied"}</p>
                    <p>Admin: {protectedData.is_admin ? "YES" : "NO"}</p>
                    <p>Contributor: {protectedData.is_contributor ? "YES" : "NO"}</p>
                </div>
            </AdminModal>)
    }
    else {
        return (<AdminModal>
            <h1>Not implemented yet </h1>
        </AdminModal>)
    }
}
