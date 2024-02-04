import styles from "./Card.module.css"
import { Link } from "react-router-dom"


export default function Card({ album }) {

    console.log((album.cover));
    return (
        <Link to={`/NISHTO_ZASEGA/${album.id.toString()}`} className={styles.card}>
            {(album.cover).includes("http")
                ?
                <img
                    className={styles.square}
                    src={album.cover}
                    alt={`${album.name}by${album.band_name}`}
                />
                :
                <div className={styles.square}><p className={styles.noImage}>No Image</p>
                </div>
            }
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
