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
                <h1>cat.ID: {albumData.id}</h1>
                <h1 className={styles.albumTitle}>{albumData.name}</h1>
                <h1>By: {albumData.band_name}</h1>
                <h1>Released: {albumData.release_year}</h1>
                <h1>Label: {albumData.label_name}</h1>
                <h1>Colour: {albumData.color}</h1>
                <h1>Duration: {albumData.duration}</h1>
                <h1>Format:  {albumData.format}</h1>
                <h1>Price: {albumData.price}</h1>
                <h1>Genres: {(albumData.genre_array).join("; ")}</h1>
                <h1>Summary: {albumData.summary}</h1>
                <h1>Quantity available: {albumData.quantity}</h1>
            </div>
            <Button style={{ gridArea: 'addBtn', width: '100%' }}>add to cart</Button>
        </div>
    )

};

export default AlbumDetails;