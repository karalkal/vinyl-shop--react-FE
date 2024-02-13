import { Button } from "../components/Button";
import styles from "./AlbumDetails.module.css"
import { useLoaderData } from "react-router-dom";


const AlbumDetails = () => {
    const albumData = useLoaderData();
    // name, band_name, label_name, cover, release_year, // => MUST HAVE
    // colour, summary, duration, format, quantity, price  // => OPTIONAL
    if (!albumData) {
        console.log("Nada!")
        return
    }
    return (
        <div className={styles.detailsContainer}>
            {/* all albums will have an image in DB but if not in correct format, i.e. not an URL, display message */}
            {(albumData.cover).includes("http")
                ?
                <img
                    className={styles.square}
                    src={albumData.cover}
                    alt={`${albumData.name}by${albumData.band_name}`}
                />
                :
                <div className={styles.square}><p className={styles.noImage}>No Image Available</p>
                </div>
            }
            <div className={styles.textPrimary}>
                <p className={styles.itemId}>item ID: {albumData.id}</p>
                <p className={styles.albumTitle}>{albumData.name}</p>
                <p >By<span className={styles.bandName}>&nbsp;{albumData.band_name}</span></p>
                <div className={styles.albumData}>
                    <p className={styles.albumDataLabel}>Released:<span>&nbsp;{albumData.release_year}</span></p>
                    <p className={styles.albumDataLabel}>Label:<span>&nbsp;{albumData.label_name}</span></p>
                    <p className={styles.albumDataLabel}>Colour:<span>&nbsp;{albumData.color || 'N.A.'}</span></p>
                    <p className={styles.albumDataLabel}>Duration:<span>&nbsp;{albumData.duration || 'N.A.'}</span></p>
                    <p className={styles.albumDataLabel}>Format:<span>&nbsp;{albumData.format || 'N.A.'}</span></p>
                    <p className={styles.albumDataLabel}>Price:<span>&nbsp;{albumData.price || 'N.A.'}</span></p>
                </div>
                <p>Genres: {(albumData.genre_array).join("; ") || 'N.A.'}</p>
                <p>Quantity available: {albumData.quantity || 'N.A.'}</p>

                <p>Summary: {albumData.summary || 'N.A.'}</p>
            </div>
            <Button style={{ gridArea: 'addBtn', width: '100%', bottom: '0', position: 'absolute' }}>Add to Cart</Button>
        </div>
    )

};

export default AlbumDetails;