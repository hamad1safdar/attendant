import React from 'react';
import ReactDOM from 'react-dom/client';

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import App from './App.tsx';
import store from './store';

import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</QueryClientProvider>
	</React.StrictMode>,
);
