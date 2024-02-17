import Card from '../components/Card';
import styles from "./Albums.module.css"
import { useLoaderData } from "react-router-dom";
import ErrorGeneric from './ErrorGeneric';


const Albums = () => {
    const albumsArray = useLoaderData();

    if (!albumsArray) {
        return <ErrorGeneric errMessage="No results found." />
    }
    console.log("found albums")
    return (
        <div className={styles.galleryContainer}>
            {albumsArray.map(album =>
                <Card album={album} key={album.id} />
            )}
        </div>
    );
};

export default Albums;
