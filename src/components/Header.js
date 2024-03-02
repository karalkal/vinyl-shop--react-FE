import { useContext } from 'react';
import AuthContext from '../context/AuthContextProvider';
import CartContext from '../context/CartContextProvider';

import { Link, useNavigate } from 'react-router-dom';

import { IconContext } from "react-icons";
import { RiShoppingCartLine } from "react-icons/ri";

import classes from './Header.module.css';
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
        <header id={classes.header}>
            <Link to="/" className={classes.headerLeft}>
                <img src={siteLogo} alt="site logo" />
                <h1>THE VINYLARIUM</h1>
            </Link>
            <form className={classes.headerCentre}>
                <input type="text" id="searchTerm" name="searchTerm" />
                <Button>Search</Button>
            </form>
            <div className={classes.headerRight}>
                {isLoggedIn
                    ?
                    <Link to="/orders" className={classes.userDiv}>
                        <Button>
                            <span>{loggedInUserData.first_name}'s</span> Orders
                        </Button>
                        <Button onClick={handleLogOut}>Log Out</Button>
                    </Link>
                    :
                    <div className={classes.userDiv}>
                        <Button onClick={() => setLoginModalVisible(true)}>Log In</Button>
                        <Button onClick={() => setRegisterModalVisible(true)}>Register</Button>
                    </div>}
                <IconContext.Provider value={{ className: `${classes.reactIcons}` }}>
                    <button className={classes.btnRight} onClick={() => setCartModalVisible(true)}>
                        <RiShoppingCartLine />

                        <span className={classes.lblCartCount}> 5 </span>

                    </button>
                </IconContext.Provider>
            </div>

        </header >)
}
