import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import socketIOClient from "socket.io-client";
import { CookiesProvider } from 'react-cookie';

import App from './App';
import authReducer from './config/store/reducer/authReducer';
import convReducer from './config/store/reducer/convReduver';
import allConvsReducer from './config/store/reducer/allConvsReducer';
import { SocketContext } from './context/context';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    conv: convReducer,
    allConvs: allConvsReducer,
});
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const socket = socketIOClient('http://localhost:3002/');

const app = (
    <CookiesProvider>
        <SocketContext.Provider value={socket}>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </SocketContext.Provider>
    </CookiesProvider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );


serviceWorker.unregister();
