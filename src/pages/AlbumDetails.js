import { Button } from "../components/Button";
import styles from "./AlbumDetails.module.css"
import { useLoaderData } from "react-router-dom";


const AlbumDetails = () => {
    const albumData = useLoaderData();
    console.log(albumData);

    if (!albumData) {
        console.log("Nada!")
        return
    }
    return (
        <div className={styles.detailsContainer}>
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
                <p>cat.ID: {albumData.id}</p>
                <h1 className={styles.albumTitle}>{albumData.name}</h1>
                <p>By<span className={styles.bandName}>&nbsp;{albumData.band_name}</span></p>
                <p>Released<span className={styles.releaseYear}>&nbsp;{albumData.release_year}</span></p>
                <p>Label<span className={styles.labelName}> {albumData.label_name}</span></p>
                <p>Colour: {albumData.color}</p>
                <p>Duration: {albumData.duration}</p>
                <p>Format:  {albumData.format}</p>
                <p>Price: {albumData.price}</p>
                <p>Genres: {(albumData.genre_array).join("; ")}</p>
                <p>Summary: {albumData.summary}</p>
                <p>Quantity available: {albumData.quantity}</p>
            </div>
            <Button style={{ gridArea: 'addBtn', width: '100%', bottom: '0', position: 'absolute' }}>Add to Cart</Button>
        </div>
    )

};

export default AlbumDetails;