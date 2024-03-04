import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartContextProvider } from './context/CartContextProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './context/AuthContextProvider';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<CartContextProvider>
			<GoogleOAuthProvider clientId={CLIENT_ID}>
				<AuthContextProvider >
					<App />
				</AuthContextProvider>
			</GoogleOAuthProvider>
		</CartContextProvider>
	</React.StrictMode>
);

