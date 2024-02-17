import React from 'react';
import Card from '../components/Card';
import styles from "./Albums.module.css"
import ErrorGeneric from './ErrorGeneric';
import { Await, defer, useLoaderData } from "react-router-dom";
import { SuspenseSpinner } from '../UI/SuspenseSpinner';

const Albums = () => {
    const data = useLoaderData();

    return (
        <main>
            <React.Suspense
                fallback={<SuspenseSpinner />}
            >
                <Await
                    resolve={data.albums}
                    errorElement={
                        <ErrorGeneric errMessage="No results" />
                    }
                >
                    {(albumsArray) => (
                        <div className={styles.galleryContainer}>
                            {albumsArray.map(album =>
                                <Card album={album} key={album.id} />
                            )}
                        </div>
                    )}
                </Await>
            </React.Suspense>
        </main>
    );
}


// return (
//     <div className={styles.galleryContainer}>
//         {albumsArray.map(album =>
//             <Card album={album} key={album.id} />
//         )}
//     </div>
// );
// };

export default Albums;
