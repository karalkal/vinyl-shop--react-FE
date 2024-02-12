import styles from './Header.module.css';
import siteLogo from '../assets/vinyl-record-small.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { IconContext } from "react-icons";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { Button } from './Button';
import { useContext } from 'react';
import AuthContext from '../context/auth-context';
import { LogIn } from '../pages/LogIn';


export default function Header() {
    const ctx = useContext(AuthContext);
    const { isLoggedIn, loggedInUserData, logoutHandler, loginModalVisible, setLoginModalVisible } = ctx
    const navigate = useNavigate()
    const handleLogOut = () => {
        // after re-setting state and localStorage navigate to "/"
        logoutHandler();
        navigate('/');
    }

    function showLogInForm() {
        ctx.onShowUserModal();
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
                        <Link to="REGISTER"><Button>Register</Button></Link>
                    </div>}
            </div>

        </header >)
}
