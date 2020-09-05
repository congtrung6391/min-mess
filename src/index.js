import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import socketIOClient from "socket.io-client";

import App from './App';
import authReducer from './config/store/reducer/authReducer';
import convReducer from './config/store/reducer/convReduver';
import { SocketContext } from './context/context';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    conv: convReducer,
});
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const socket = socketIOClient('http://localhost:3001/');

const app = (
    <SocketContext.Provider value={socket}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </SocketContext.Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );


serviceWorker.unregister();
