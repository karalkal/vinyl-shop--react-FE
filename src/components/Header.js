import { useContext } from 'react';
import AuthContext from '../context/AuthContextProvider';
import CartContext from '../context/CartContextProvider';

import { Link, useNavigate } from 'react-router-dom';

import { IconContext } from "react-icons";
import { RiShoppingCartLine } from "react-icons/ri";

import styles from './Header.module.css';
import siteLogo from '../assets/vinyl-record-small.jpg'
import { Button } from './Button';


export default function Header() {
    const { isLoggedIn, loggedInUserData, logoutHandler, setLoginModalVisible, setRegisterModalVisible } = useContext(AuthContext);
    const { setCartModalVisible } = useContext(CartContext)
    const navigate = useNavigate()
    const handleLogOut = () => {
        // after re-setting state and localStorage navigate to "/"
        logoutHandler();
        navigate('/');
    }


    return (
        <header id={styles.header}>
            <Link to="/" className={styles.headerLeft}>
                <img src={siteLogo} alt="site logo" />
                <h1>THE VINYLARIUM</h1>
            </Link>
            <form className={styles.headerCentre}>
                <input type="text" id="searchTerm" name="searchTerm" />
                <Button>Search</Button>
            </form>
            <div className={styles.headerRight}>
                {isLoggedIn
                    ?
                    <div className={styles.userDiv}>
                        <div id={styles.userHello}>
                            <p>User: <span>{loggedInUserData.first_name}</span> </p>
                        </div>
                        <Button onClick={handleLogOut}>Log Out</Button>
                    </div>
                    :
                    <div className={styles.userDiv}>
                        <Button onClick={() => setLoginModalVisible(true)}>Log In</Button>
                        <Button onClick={() => setRegisterModalVisible(true)}>Register</Button>
                    </div>}
                <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                    <button className={styles.btnRight} onClick={() => setCartModalVisible(true)}> <RiShoppingCartLine /></button>
                </IconContext.Provider>
            </div>

        </header >)
}
