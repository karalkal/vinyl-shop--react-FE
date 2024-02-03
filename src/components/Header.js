import { NavLink, } from 'react-router-dom'

import styles from './Header.module.css'


export default function Header() {
    return (
        <header id={styles.header}>
            <NavLink to="/">
                <h1>HEADER</h1>
            </NavLink>

        </header >)
}
