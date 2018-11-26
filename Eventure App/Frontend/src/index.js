import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import thunkMiddleware from "redux-thunk"

import RootReducer from "./reducers";
import OwnerLogin from "./components/Login/OwnerLogIn";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


//middleware settings
// To resolve promise to store we use apply
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(promise, thunkMiddleware)));
//createStoreWithMiddleware(RootReducer)

ReactDOM.render(

    <Provider store={store}>
    <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
export default store;
