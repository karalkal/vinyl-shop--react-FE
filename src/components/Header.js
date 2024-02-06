import styles from './Header.module.css';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';


export default function Header() {
    const ctx = useContext(AuthContext)
    console.log(ctx);
    return (
        <header id={styles.header}>
            <h1>THE VINYLARIUM</h1>
            {!1 === 1
                ?
                <button onClick={() => console.log("LOGIN")}>Logout</button>
                :
                <button onClick={() => console.log("LOGOUT")}>Logout</button>
            }
        </header >)
}
