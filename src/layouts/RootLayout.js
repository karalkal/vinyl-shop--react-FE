import React, { useContext } from 'react';
import Header from '../components/Header'
import { Outlet } from 'react-router-dom';
import { LogIn } from '../pages/LogIn';
import AuthContext from '../context/auth-context';

const RootLayout = () => {

    const { loginModalVisible, setLoginModalVisible } = useContext(AuthContext)
    return (
        <>
            {/* render modals if enabled */}
            {loginModalVisible && <LogIn />}

            <Header />
            {/* Outlet will render a <main> component depending on the route selected */}
            <Outlet />
        </>
    );
};

export default RootLayout;
