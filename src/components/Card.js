import styles from "./Card.module.css"
import { Link } from "react-router-dom"


export default function Card({ album }) {
    return (
        <Link to={`/album/${album.id.toString()}`} className={styles.card}>
            {(album.cover).includes("http")
                ?
                <img
                    className={styles.square}
                    src={album.cover}
                    alt={`${album.name}by${album.band_name}`}
                />
                :
                <div className={styles.square}><p className={styles.noImage}>No Image Available</p>
                </div>
            }
            <div className={styles.cardText}>
                <div>
                    <p>{album.name}</p>
                    <hr></hr>
                    <p>by <span>{album.band_name}</span></p>
                    <p>year <span>{album.release_year}</span></p>
                    <hr></hr>
                    <p><span>{album.colour}</span> vinyl</p>
                </div>
                <div>
                    <p><span>£{album.price}</span></p>
                </div>
            </div>
        </Link>
    )
}
