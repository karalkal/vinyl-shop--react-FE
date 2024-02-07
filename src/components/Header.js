import styles from './Header.module.css';
import { SignInComponent } from './LogIn';


export default function Header() {
    return (
        <header id={styles.header}>
            <h1>THE VINYLARIUM</h1>
            {1 === 1
                ?
                <SignInComponent />
                :
                <button onClick={() => console.log("LOGOUT")}>Logout</button>
            }
        </header >)
}
