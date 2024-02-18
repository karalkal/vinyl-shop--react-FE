import axios, { AxiosError } from "axios";

const ROOT_ENDPOINT = "https://vinyl-shop.onrender.com/api/v1";
// delay api calls for testing
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


export async function fetchAllAlbums() {
    // await sleep(2000);
    try {
        const response = await fetch(`${ROOT_ENDPOINT}/albums`);
        if (!response.ok) {
            throw new Error(`${response.statusText} - ${response.status}`);
        }   // if ok
        const json = await response.json();
        return json;
    } catch (error) {
        // will catch errors from if (!response.ok) too 
        throw new Error(error.message);
    }
};

export async function fetchAlbumById(albumId) {
    await sleep(2000);
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

export async function logIn(formData) {
    try {
        const response = await axios.post(`${ROOT_ENDPOINT}/auth/login/`, formData);
        return response
    }
    catch (err) {
        if (err && err instanceof AxiosError) {
            console.log(err.code, err.message)
            throw new Error(`${err.code} - ${err.message}`);
        }
        else {
            console.log("other error", err.response)
            throw new Error(err.message);
        }
    }
}

export async function register(userInput) {
    try {
        const response = await axios.post(`${ROOT_ENDPOINT}/auth/register/`, userInput);
        return response
    }
    catch (err) {
        if (err && err instanceof AxiosError) {
            console.log(err.code, err.message)
            throw new Error(`${err.code} - ${err.message}`);
        }
        else {
            console.log("other error")
            throw new Error(err.message);
        }
    }
}




