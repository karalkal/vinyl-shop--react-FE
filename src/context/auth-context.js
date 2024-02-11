import { createContext, useState, useEffect } from 'react';


const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => { },            // dummy function, to help with autocompletion, and maintain data persistency
    onLogin: (email, pw) => { }
})


// We can manage the whole auth functionality here, return wrapper which is context provider and then wrap the App component in it
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUserData, setLoggedInUserData] = useState({})
    const [userModalVisible, setUserModalVisible] = useState(false);

    const showUserModalHandler = () => {
        setUserModalVisible(true)
    }
    const hideUserModalHandler = () => {
        setUserModalVisible(false)
    }

    // check localStorage for logged in user, if logged in - change state
    // if not logged in/logs out and logs in again, LogIn comp will set new values in localStorage,
    // will update state of isLoggedIn and effect will run again
    useEffect(() => {
        const auth_token = localStorage.getItem('auth_token')
        const email = localStorage.getItem('email')
        const first_name = localStorage.getItem('first_name')
        const last_name = localStorage.getItem('last_name')
        if (auth_token && email && first_name && last_name) {
            setIsLoggedIn(true);
            setLoggedInUserData({ auth_token, email, first_name, last_name })
        }
    }, []);     // will run only at initial render



    const logoutHandler = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    }

    const loginHandler = (data) => {
        const { token, email, first_name, last_name } = data
        localStorage.clear();
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("first_name", data.first_name);
        localStorage.setItem("last_name", data.last_name);

        setIsLoggedIn(true);
        setLoggedInUserData({ token, email, first_name, last_name });
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            loggedInUserData: loggedInUserData,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}>
            {props.children}
        </AuthContext.Provider>)
}

export default AuthContext