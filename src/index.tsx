import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

const rootElem = document.getElementById('root');

if (rootElem) {
	const root = ReactDOM.createRoot(rootElem);

	root.render(
		<Provider store={store}>
			<BrowserRouter>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</BrowserRouter>
		</Provider>
	);
}
