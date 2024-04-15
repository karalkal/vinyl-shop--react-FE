import { useContext } from 'react';
import AuthContext from '../context/AuthContextProvider';
import CartContext from '../context/CartContextProvider';

import { Link, useNavigate } from 'react-router-dom';

import { IconContext } from "react-icons";
import { RiShoppingCartLine } from "react-icons/ri";

import styles from './Header.module.css';
import siteLogo from '../assets/vinyl-record-small.jpg';
import { SearchForm } from './SearchForm';
import { Button } from './Button';


export default function Header() {
    const { isLoggedIn, logoutHandler, setLoginModalVisible, setRegisterModalVisible } = useContext(AuthContext);
    const { setCartModalVisible, items } = useContext(CartContext);

    const navigate = useNavigate()
    const handleLogOut = () => {
        logoutHandler();
                // after re-setting state and localStorage navigate to "/"
                navigate('/', { replace: true });
                navigate(0);        // for a second it redirects to /orders, don't know why        
    }
    // each item from items has amountRequested, we need count of items x amountRequested
    const itemsCount = items.map(item => item.amountRequested)
        .reduce((partialSum, a) => partialSum + a, 0);

    


    return (
        <header id={styles.header}>
            <Link to="/" className={styles.headerLeft}>
                <img src={siteLogo} alt="site logo" />
                <h1>THE VINYLARIUM</h1>
            </Link>
            <SearchForm className={styles.headerCentre}/>
            <div className={styles.headerRight}>
                {isLoggedIn
                    ?
                    <Link to="/orders" className={styles.userDiv}>
                        <Button>
                            {/* <span>{loggedInUserData.first_name}'s</span> Orders */}
                            Orders
                        </Button>
                        <Button onClick={handleLogOut}>Log Out</Button>
                    </Link>
                    :
                    <div className={styles.userDiv}>
                        <Button onClick={() => setLoginModalVisible(true)}>Log In</Button>
                        <Button onClick={() => setRegisterModalVisible(true)}>Register</Button>
                    </div>}
                <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                    <button className={styles.btnRight} onClick={() => setCartModalVisible(true)}>
                        <RiShoppingCartLine />

                        <span className={styles.lblCartCount}>{itemsCount}</span>

                    </button>
                </IconContext.Provider>
            </div>

        </header >)
}
