import React from 'react';
import Card from '../components/Card';
import styles from "./Albums.module.css"
import ErrorGeneric from './ErrorGeneric';
import { Await, useLoaderData } from "react-router-dom";
import { SuspenseSpinner } from '../modals/SuspenseSpinner';

const FoundAlbums = () => {
    const data = useLoaderData();

    function Results({ albumsArray }) {
        return <>
            {albumsArray.length > 0
                ? <div className={styles.galleryContainer}>
                    {albumsArray.map(album => {
                        // overwrite price of albums to be Numeric, not best place to do it
                        album.price = Number(album.price);
                        return <Card album={album} key={album.id} />
                    }
                    )}
                </div>
                : <ErrorGeneric errMessage="No albums found" />
            }
        </>
    }

    return (
        <main>
            <React.Suspense
                fallback={<SuspenseSpinner />}
            >
                <Await
                    resolve={data.albums}
                    errorElement={<ErrorGeneric errMessage="Query returned error" />}
                >
                    {(resolvedPromise) => <Results albumsArray={resolvedPromise} />}
                </Await>
            </React.Suspense>
        </main>
    );
}


export default FoundAlbums;
