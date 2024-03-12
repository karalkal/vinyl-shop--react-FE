import { createContext, useState } from 'react';

const ErrorContext = createContext({
    hasError: "",
})


export const ErrorContextProvider = (props) => {
    const [hasError, setHasError] = useState("");

    return (
        <ErrorContext.Provider value={{
            hasError: hasError,
            setHasError: setHasError
        }}>
            {props.children}
        </ErrorContext.Provider>)
}

export default ErrorContext;

