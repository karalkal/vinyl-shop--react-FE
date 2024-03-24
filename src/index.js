import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartContextProvider } from './context/CartContextProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './context/AuthContextProvider';
import { ErrorContextProvider } from './context/ErrorContextProvider';

// const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_ID = "990759995396-ib4uaic3p9diht4joe2f5npp41svtq5f.apps.googleusercontent.com";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ErrorContextProvider>
			<CartContextProvider>
				<GoogleOAuthProvider clientId={CLIENT_ID}>
					<AuthContextProvider >
						<App />
					</AuthContextProvider>
				</GoogleOAuthProvider>
			</CartContextProvider>
		</ErrorContextProvider>
	</React.StrictMode>
);

