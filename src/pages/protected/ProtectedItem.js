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
    else {
        return (<AdminModal>
            <h1>Not implemented yet </h1>
        </AdminModal>)
    }
}
