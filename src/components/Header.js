import { useContext } from 'react';
import AuthContext from '../context/auth-context';

import { Link, useNavigate } from 'react-router-dom';

import { IconContext } from "react-icons";
import { RiShoppingCartLine } from "react-icons/ri";

import styles from './Header.module.css';
import siteLogo from '../assets/vinyl-record-small.jpg'
import { Button } from './Button';


export default function Header() {
    const ctx = useContext(AuthContext);
    const { isLoggedIn, loggedInUserData, logoutHandler, setLoginModalVisible, setRegisterModalVisible } = ctx
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
            <div>
                <form className={styles.headerCentre}>
                    <input type="text" id="searchTerm" name="searchTerm" />
                    <Button>Search</Button>
                </form>
            </div>
            <div className={styles.headerRight}>
                <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                    <Link to="cart" className={styles.btnRight}> <RiShoppingCartLine /></Link>
                </IconContext.Provider>

                {isLoggedIn
                    ?
                    <div className={styles.userDiv}>
                        <div id={styles.userHello}>
                            <p>Logged as <span>{loggedInUserData.first_name}</span> </p>
                        </div>
                        <Button onClick={handleLogOut}>Log Out</Button>
                    </div>
                    :
                    <div className={styles.userDiv}>
                        <Button onClick={() => setLoginModalVisible(true)}>Log In</Button>
                        <Button onClick={() => setRegisterModalVisible(true)}>Register</Button>
                    </div>}
            </div>

        </header >)
}
