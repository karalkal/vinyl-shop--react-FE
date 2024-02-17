import React, { Suspense, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header'
import AuthContext from '../context/AuthContextProvider';
import { LogIn } from '../UI/LogInModal';
import { Register } from '../UI/RegisterModal';
import { SuspenseSpinner } from '../UI/SuspenseSpinner';

const RootLayout = () => {

    const { loginModalVisible, registerModalVisible } = useContext(AuthContext)
    return (
        <>
            {/* render modals if enabled */}
            {loginModalVisible && <LogIn />}
            {registerModalVisible && <Register />}

            <Header />
            {/* Outlet will render a <main> component depending on the route selected */}
            <Outlet />
        </>
    );
};

export default RootLayout;
