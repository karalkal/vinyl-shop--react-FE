import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/auth-context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	<AuthContextProvider
		authType={"cookie"}
		authName={"_auth"}
		cookieDomain={window.location.hostname}
		cookieSecure={window.location.protocol === 'https:'} >
		<App />
	</AuthContextProvider>
	// </React.StrictMode>
);

