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
                    <Button title="search our database">search</Button>
                </form>
            </div>
            <div className={styles.headerRight}>
                <IconContext.Provider value={{ className: `${styles.reactIcons}` }}>
                    <div> <RiShoppingCartLine /></div>
                    <div> <RiAccountCircleLine /></div>
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
