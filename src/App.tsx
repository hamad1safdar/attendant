import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import store from './store';

import './App.css';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
