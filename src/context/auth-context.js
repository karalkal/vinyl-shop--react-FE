import { createContext, useState, useEffect } from 'react';


const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => { },            // dummy function, to help with autocompletion, and maintain data persistency
    onLogin: (email, pw) => { }
})

// We can manage the whole auth functionality here, return wrapper which is context provider and then wrap the App component in it
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userModalVisible, setUserModalVisible] = useState(false)

    const showUserModalHandler = () => {
      setUserModalVisible(true)
    }
    const hideUserModalHandler = () => {
      setUserModalVisible(false)
    }
  
    // check localStorage for logged in user
    useEffect(() => {
        const auth_token = localStorage.getItem('auth_token')
        if (auth_token) {
            setIsLoggedIn(true)
        }
    }, [])     // no dependency, i.e. check only at first render cycle

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false)
    }

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "Y");
        setIsLoggedIn(true)
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}>
            {props.children}
        </AuthContext.Provider>)
}

export default AuthContext