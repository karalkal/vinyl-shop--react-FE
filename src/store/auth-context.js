import React, { useState, useEffect, createContext } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },            // dummy function, to help with autocompletion, and maintain data persistency
    onLogin: (email, pw) => { }
})

// We can manage the whole auth functionality here, return wrapper which is context provider and then wrap the App component in it
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // check localStorage for logged in user
    useEffect(() => {
        const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn')
        if (storedUserLoggedInInfo === "Y") {
            setIsLoggedIn(true)
        }
    }, [])     // no dependency, i.e. only at first render cycle

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false)
    }

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "Y");
        setIsLoggedIn(true)
    }

    return (
        // Provider is property of createContext()
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}>
            {props.children}
        </AuthContext.Provider>)
}

export default AuthContext