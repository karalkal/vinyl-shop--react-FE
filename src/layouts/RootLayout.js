import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header'
import AuthContext from '../context/AuthContextProvider';
import CartContext from '../context/CartContextProvider';
import { LogInModal } from '../UI/LogInModal';
import { RegisterModal } from '../UI/RegisterModal';
import { Cart } from '../components/Cart'

const RootLayout = () => {

    const { loginModalVisible, registerModalVisible } = useContext(AuthContext);
    const { cartModalVisible } = useContext(CartContext);
    return (
        <>
            {/* render modals if enabled */}
            {loginModalVisible && <LogInModal />}
            {registerModalVisible && <RegisterModal />}
            {cartModalVisible && <Cart />}

            <Header />
            {/* Outlet will render a <main> component depending on the route selected */}
            <Outlet />
        </>
    );
};

export default RootLayout;
