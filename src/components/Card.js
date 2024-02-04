import styles from "./Card.module.css"
import { Link } from "react-router-dom"


export default function Card({ album }) {
    return (
        <Link to={`/KUR/${album.id.toString()}`} className={styles.card}>
            <img
                className={styles.square}
                src={album.cover}
                alt={`${album.name}by${album.band_name}`}
            />
            <div className={styles.cardText}>
                <p> {album.id} </p>
                <p> {album.name} </p>
                <p> {album.band_name} </p>
                <p> {album.colour} </p>
                <p> {album.price} </p>
                <p> {album.release_year} </p>
            </div>
        </Link>
    )
}
