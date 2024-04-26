import axios, { AxiosError } from "axios";

// const ROOT_ENDPOINT = "https://vinyl-shop.onrender.com/api/v1";
const ROOT_ENDPOINT = "http://localhost:3000/api/v1";
// delay api calls for testing
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function verifyUserIsAdmin(authToken) {
    // await sleep(2000);
    // console.log("sending req with:", authToken)
    try {
        const response = await axios.get(`${ROOT_ENDPOINT}/auth/admin/`,
            {
                headers: { Authorization: `Bearer ${authToken}` }
            });
        return response
    }
    catch (err) {
        if (err && err instanceof AxiosError) {
            throw new Error("Admin auth failed");
        }
        else {
            console.log("Something went wrong", err.response)
            throw new Error(err.message);
        }
    }
};

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

export async function findAlbums(queryString) {
    // await sleep(2000);
    try {
        const response = await fetch(`${ROOT_ENDPOINT}/albums/search?${queryString}`);
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
    // await sleep(2000);
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
            throw new Error(err.message);
        }
        else {
            console.log("other error", err.response)
            throw new Error(err.message);
        }
    }
}


export async function logInWithGoogle(code) {
    try {
        const response = await axios.post(`${ROOT_ENDPOINT}/auth/google/`, code);
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

export async function placeOrder(orderBody, authToken) {
    console.log(orderBody);
    try {
        const response = await axios.post(`${ROOT_ENDPOINT}/orders/`,
            orderBody,
            {
                headers: { Authorization: `Bearer ${authToken}` }
            });
        console.log(response)
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

export async function fetchAllOrders(authToken) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }
    try {
        const response = await fetch(`${ROOT_ENDPOINT}/orders`, { headers });
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

/*              ==== USERS ====                 */
export async function fetchAllUsers(authToken) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }
    try {
        const response = await fetch(`${ROOT_ENDPOINT}/users`, { headers });
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

export async function fetchUserById(authToken, idOfUser) {
    console.log(authToken)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }
    try {
        const response = await fetch(`${ROOT_ENDPOINT}/users/${idOfUser}`, { headers });
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

// at BE -> usersRouter.put("/:userId", userAuthentication, updateUser);
export async function updateUser(authToken, idOfUser, newData) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }

    try {
        const response = await axios.put(`${ROOT_ENDPOINT}/users/${idOfUser}`,
            newData,
            { headers: headers });
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

export async function deleteUser(authToken, idOfUser) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }

    try {
        const response = await axios.delete(`${ROOT_ENDPOINT}/users/${idOfUser}`,
            { headers: headers });
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

/*              ==== BANDS ====                 */
export async function fetchAllBands(authToken) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }
    try {
        const response = await fetch(`${ROOT_ENDPOINT}/bands`, { headers });
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

export async function fetchBandById(authToken, idOfBand) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }
    try {
        const response = await fetch(`${ROOT_ENDPOINT}/bands/${idOfBand}`, { headers });
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


export async function updateBand(authToken, idOfBand, newData) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }

    try {
        const response = await axios.put(`${ROOT_ENDPOINT}/bands/${idOfBand}`,
            newData,
            { headers: headers });
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

export async function deleteBand(authToken, idOfBand) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }

    try {
        const response = await axios.delete(`${ROOT_ENDPOINT}/bands/${idOfBand}`,
            { headers: headers });
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








