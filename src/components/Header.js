import styles from './Header.module.css';
import { SignInComponent } from './LogIn';
import siteLogo from '../assets/vinyl-record-small.jpg'


export default function Header() {
    return (
        <header id={styles.header}>
            <div className={styles.headerLeft}>
                <img src={siteLogo} alt="site logo" />
                <h1>THE VINYLARIUM</h1>
            </div>
            <div className={styles.headerCentre}>
                <div>
                    <p>SEARCH</p>
                </div>
            </div>
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
