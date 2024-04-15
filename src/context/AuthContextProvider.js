import { createContext, useState, useEffect } from 'react';


const AuthContext = createContext({
    isLoggedIn: false,
    logoutHandler: () => { },            // dummy function, to help with autocompletion, and maintain data persistency
    loginHandler: (email, pw) => { }
})


// We can manage the whole auth functionality here, return wrapper which is context provider and then wrap the App component in it
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUserData, setLoggedInUserData] = useState({})
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    const [adminModalVisible, setAdminModalVisible] = useState(false);

    // check localStorage for logged in user, if logged in - change state
    // if not logged in/logs out and logs in again, LogIn comp will set new values in localStorage,
    // will update state of isLoggedIn and effect will run again
    useEffect(() => {
        const auth_token = localStorage.getItem('auth_token')
        const email = localStorage.getItem('email')
        const first_name = localStorage.getItem('first_name')
        const last_name = localStorage.getItem('last_name')
        const is_admin = localStorage.getItem('is_admin')
        if (auth_token && email && first_name && last_name) {
            setIsLoggedIn(true);
            setLoggedInUserData({
                auth_token, email, first_name, last_name, is_admin        // is_admin will be string Y or N
            })
        }
    }, []);     // will run only at initial render


    const logoutHandler = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setLoggedInUserData({});
    }

    // Also when registering... log in and hide Modal(s)
    const loginHandler = (data) => {
        const { token, email, first_name, last_name, is_admin } = data;
        console.log(data)
        localStorage.clear();
        localStorage.setItem("auth_token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("last_name", last_name);
        // We can only store strings as values in local storage, true which we get from data or undefined if we get nothing does not work well, hence Y or N
        // Each request will check the token if indeed is admin to avoid tampering with localStorage Data
        localStorage.setItem("is_admin", is_admin === true ? "Y" : "N");

        setLoggedInUserData({ auth_token: token, email, first_name, last_name, is_admin: is_admin === true ? "Y" : "N" });
        setIsLoggedIn(true);
        setLoginModalVisible(false);             // hide modals once user is logged in
        setRegisterModalVisible(false);
    }


    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            loggedInUserData: loggedInUserData,
            logoutHandler: logoutHandler,
            loginHandler: loginHandler,
            loginModalVisible: loginModalVisible,
            setLoginModalVisible: setLoginModalVisible,
            registerModalVisible: registerModalVisible,
            setRegisterModalVisible: setRegisterModalVisible,
            adminModalVisible: adminModalVisible,
            setAdminModalVisible: setAdminModalVisible,
        }}>
            {props.children}
        </AuthContext.Provider>)
}

export default AuthContext
