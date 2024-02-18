import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContextProvider';
import { CartContextProvider } from './context/CartContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	<CartContextProvider>
		<AuthContextProvider >
			<App />
		</AuthContextProvider>
	</CartContextProvider>
	// </React.StrictMode>
);

