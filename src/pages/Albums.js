import React from 'react';
import Card from '../components/Card';
import styles from "./Albums.module.css"
import ErrorGeneric from './ErrorGeneric';
import { Await, useLoaderData } from "react-router-dom";
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
                        <ErrorGeneric errMessage="Query returned error" />
                    }
                >
                    {(albumsArray) => (
                        <div className={styles.galleryContainer}>
                            {albumsArray.map(album => {
                                // overwrite price of albums to be Numeric, not best place to do it
                                album.price = Number(album.price);
                                return <Card album={album} key={album.id} />
                            }
                            )}
                        </div>
                    )}
                </Await>
            </React.Suspense>
        </main>
    );
}


export default Albums;
