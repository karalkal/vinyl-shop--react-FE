import styles from './Header.module.css';
import { SignInComponent } from './LogIn';
import siteLogo from '../assets/vinyl-record-small.jpg'
import { Link } from 'react-router-dom';


export default function Header() {
    return (
        <header id={styles.header}>
            <Link to="/" className={styles.headerLeft}>
                <img src={siteLogo} alt="site logo" />
                <h1>THE VINYLARIUM</h1>
            </Link>
            <form className={styles.headerCentre}>
                <input type="text" id="searchTerm" name="searchTerm" />
                <button>search</button>
            </form>
            <div className={styles.headerRight}>
                <button>Log In/Register</button>
                <button>Cart</button>

            </div>
            {/* {1 === 1
                ?
                <SignInComponent />
                :
                <button onClick={() => console.log("LOGOUT")}>Logout</button>
            } */}
        </header >)
}
