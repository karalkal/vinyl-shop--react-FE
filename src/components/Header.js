import styles from './Header.module.css';
import { SignInComponent } from './LogIn';
import siteLogo from '../assets/vinyl-record-small.jpg'
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { Button } from './Button';


export default function Header() {
    return (
        <header id={styles.header}>
            <Link to="/" className={styles.headerLeft}>
                <img src={siteLogo} alt="site logo" />
                <h1>THE VINYLARIUM</h1>
            </Link>
            <div>
                <form className={styles.headerCentre}>
                    <input type="text" id="searchTerm" name="searchTerm" />
                    <Button>search</Button>
                </form>
            </div>
            <div className={styles.headerRight}>
                <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                    <Link to="LOGIN" className={styles.btnRight}> <RiShoppingCartLine /></Link>
                    <Link to="LOGIN" className={styles.btnRight}> <RiAccountCircleLine /></Link>
                </IconContext.Provider>

            </div>
            {/* {1 === 1
                ?
                <SignInComponent />
                :
                <button onClick={() => console.log("LOGOUT")}>Logout</button>
            } */}
        </header >)
}
