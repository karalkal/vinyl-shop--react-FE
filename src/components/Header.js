import styles from './Header.module.css';
import siteLogo from '../assets/vinyl-record-small.jpg'
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { Button } from './Button';
import { useContext } from 'react';
import AuthContext from '../context/auth-context';


export default function Header() {
    const ctx = useContext(AuthContext);
    const { isLoggedIn, loggedInUserData, onLogout } = ctx

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
                    <Link to="LOGIN" className={styles.btnRight}> <RiShoppingCartLine /></Link>
                </IconContext.Provider>

                {isLoggedIn
                    ?
                    <div className={styles.userDiv}>
                        <div id={styles.userHello}>
                            <p>Welcome, <span>{loggedInUserData.first_name}</span> </p>
                        </div>
                        <Button onClick={onLogout}>Log Out</Button>
                    </div>
                    :
                    <div className={styles.userDiv}>
                        <Link to="LOGIN"><Button>Log In</Button></Link>
                        <Link to="REGISTER"><Button>Register</Button></Link>

                    </div>}
            </div>

        </header >)
}
