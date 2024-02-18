import { useContext } from "react";
import { Button } from "../components/Button";
import styles from "./AlbumDetails.module.css"
import { useLoaderData } from "react-router-dom";
import CartContext from "../context/CartContextProvider";


const AlbumDetails = () => {
    const albumData = useLoaderData();
    // name, band_name, label_name, cover, release_year, price      // => MUST HAVE
    // colour, summary, duration, format, quantity                  // => OPTIONAL
    const ctx = useContext(CartContext)


    if (!albumData) {
        console.log("Nada!")
        return
    }

    albumData.price = Number(albumData.price)
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
                <p>By<span className={styles.bandName}>&nbsp;&nbsp;{albumData.band_name}</span></p>
                <div className={styles.albumDataDiv}>
                    <p className={styles.albumDataDivLabel}>released:&nbsp;</p>
                    <p className={styles.albumDataDivValue}>{albumData.release_year}</p>
                    <p></p>
                    <p className={styles.albumDataDivLabel}>label:&nbsp;</p>
                    <p className={styles.albumDataDivValue}>{albumData.label_name}</p>

                    <p className={styles.albumDataDivLabel}>colour:&nbsp;</p>
                    <p className={styles.albumDataDivValue}>{albumData.color || 'unknown/black'}</p>
                    <p></p>
                    <p className={styles.albumDataDivLabel}>duration:&nbsp;</p>
                    <p className={styles.albumDataDivValue}>{albumData.duration || 'unknown'}</p>

                    <p className={styles.albumDataDivLabel}>format:&nbsp;</p>
                    <p className={styles.albumDataDivValue}>{albumData.format || 'unknown'}</p>
                    <p></p>
                    <p className={styles.albumDataDivLabel}>in stock:&nbsp;</p>
                    <p className={styles.albumDataDivValue}>{albumData.quantity || 'unknown'}</p>
                </div>
                <div className={styles.genreSummary}>
                    <p className={styles.genreSummaryLabel}>genre:&nbsp;</p>
                    <p>{(albumData.genre_array).join("; ") || 'unknown'}</p>

                    <p className={styles.genreSummaryLabel}>summary:&nbsp;</p>
                    <p>{albumData.summary || 'unknown'}</p>
                </div>
                <div className={styles.priceSection}>
                    <p className={styles.genreSummaryLabel}>price:&nbsp;</p>
                    <p className={styles.price}>{`£${(albumData.price).toFixed(2)}` || 'unknown'}</p>
                </div>
            </div>
            <Button
                style={{ gridArea: 'addBtn', width: '100%', bottom: '0', position: 'absolute' }}
                onClick={() => ctx.addItem(albumData)}
            >Add to Cart
            </Button>
        </div>
    )

};

export default AlbumDetails;