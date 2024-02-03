import { encode as base64_encode } from 'base-64';

const ROOT_ENDPOINT = "https://vynyl-shop.onrender.com/api/v1"


export async function fetchSearchResult() {
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



