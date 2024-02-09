import React from 'react';
import Header from '../components/Header'
import { Outlet } from 'react-router-dom';
// import styles from './RootLayout.module.css'

const RootLayout = () => {
    return (
        <>
            <Header />
            {/* Outlet will render a <main> component depending on the route selected */}
            <Outlet />
        </>
    );
};

export default RootLayout;
