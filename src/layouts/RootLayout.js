import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header'
import AuthContext from '../context/AuthContextProvider';
import CartContext from '../context/CartContextProvider';
import ErrorContext from '../context/ErrorContextProvider';
import { RegisterModal } from '../modals/RegisterModal';
import { LogInModal } from '../modals/LogInModal';
import AdminModal from '../modals/AdminModal';
import { Cart } from '../pages/Cart';
import ErrorGeneric from '../pages/ErrorGeneric';
import { ProtectedItem } from '../pages/protected/ProtectedItem';

const RootLayout = () => {

    const { loginModalVisible, registerModalVisible, adminModalVisible } = useContext(AuthContext);
    const { cartModalVisible } = useContext(CartContext);
    const { hasError } = useContext(ErrorContext);


    return (
        <>
            <Header />
            {hasError
                ? <ErrorGeneric errMessage={hasError} />
                : <>
                    {/* render modals if enabled */}
                    {loginModalVisible && <LogInModal />}
                    {registerModalVisible && <RegisterModal />}
                    {cartModalVisible && <Cart />}
                    {adminModalVisible && <ProtectedItem />}

                    {/* Outlet will render a <main> component depending on the route selected */}
                    <Outlet />
                </>
            }


        </>
    );
};

export default RootLayout;
