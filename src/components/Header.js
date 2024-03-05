import { useContext } from 'react';
import AuthContext from '../context/AuthContextProvider';
import CartContext from '../context/CartContextProvider';

import { Link, useNavigate } from 'react-router-dom';

import { IconContext } from "react-icons";
import { RiShoppingCartLine } from "react-icons/ri";

import classes from './Header.module.css';
import siteLogo from '../assets/vinyl-record-small.jpg';
import { SearchForm } from './SearchForm';
import { Button } from './Button';


export default function Header() {
    const { isLoggedIn, loggedInUserData, logoutHandler, setLoginModalVisible, setRegisterModalVisible } = useContext(AuthContext);
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
        <header id={classes.header}>
            <Link to="/" className={classes.headerLeft}>
                <img src={siteLogo} alt="site logo" />
                <h1>THE VINYLARIUM</h1>
            </Link>
            <SearchForm className={classes.headerCentre}/>
            <div className={classes.headerRight}>
                {isLoggedIn
                    ?
                    <Link to="/orders" className={classes.userDiv}>
                        <Button>
                            {/* <span>{loggedInUserData.first_name}'s</span> Orders */}
                            Orders
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

                        <span className={classes.lblCartCount}>{itemsCount}</span>

                    </button>
                </IconContext.Provider>
            </div>

        </header >)
}
