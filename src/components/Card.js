import styles from "./Card.module.css"
import { Link } from "react-router-dom"


export default function Card({ album }) {
    return (
        <Link to={`/KUR/${album.id.toString()}`} className={styles.cardContainer}>
            <p> {album.id} </p>
            <p> {album.name} </p>
            <p> {album.band_name} </p>
            <p> {album.colour} </p>
            <p> {album.cover} </p>
            <p> {album.id} </p>
            <p> {album.price} </p>
            <p> {album.release_year} </p>
        </Link>)
}
