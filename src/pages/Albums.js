import React from 'react';
import Card from '../components/Card';
import styles from "./Albums.module.css"
import { useLoaderData } from "react-router-dom";
import { SuspenseModal } from '../UI/SuspenseModal';


const Albums = () => {
    const albumsArray = useLoaderData();

    if (!albumsArray) {
        console.log("Nada!")
        return
    }

    else{console.log("albums found");}
    return (
        
                    <React.Suspense fallback={<SuspenseModal />}>

            <div className={styles.galleryContainer}>
                {albumsArray.map(album =>
                    <Card album={album} key={album.id} />
                )}

            </div>
            </React.Suspense>
        
    );
};

export default Albums;
