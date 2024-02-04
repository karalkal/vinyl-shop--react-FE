const ROOT_ENDPOINT = "https://vinyl-shop.onrender.com/api/v1"


export async function fetchAllAlbums() {
    try {
        const response = await fetch(`${ROOT_ENDPOINT}/albums`)

        if (!response.ok) {
            throw new Error(`${response.statusText} - ${response.status}`);
        }   // if ok
        const json = await response.json();
        return json
    } catch (error) {
        // will catch errors from if (!response.ok) too 
        throw new Error(error.message);
    }
};

export async function fetchAlbumById(albumId) {
    try {
        const response = await fetch(`${ROOT_ENDPOINT}/albums/${albumId}`)

        if (!response.ok) {
            throw new Error(`${response.statusText} - ${response.status}`);
        }   // if ok
        const json = await response.json();
        return json
    } catch (error) {
        // will catch errors from if (!response.ok) too 
        throw new Error(error.message);
    }
};



