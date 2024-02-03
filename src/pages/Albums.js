import Card from '../components/Card';
import styles from "./Albums.module.css"
import { useLoaderData } from "react-router-dom";


const Albums = () => {
    const albumsArray = useLoaderData();
    console.log(albumsArray);

    if (!albumsArray) {
        console.log("Nada!")
        return
    }
    return (
        <>
            <div className={styles.galleryContainer}>
                {albumsArray.map(album =>
                    <Card album={album} key={album.id} />
                )}

            </div>
        </>
    );
};

export default Albums;
