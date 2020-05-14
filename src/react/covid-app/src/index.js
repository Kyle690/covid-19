import React from 'react';
import './assets/Css/mainStyle.css';
import ReactDOM from 'react-dom';
import {Provider}from 'react-redux';
import {createStore, applyMiddleware,compose} from "redux";
import reduxThunk from 'redux-thunk';
import Reducers from './Store/Reducers/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Reducers,composeEnhancers(applyMiddleware(reduxThunk)));


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)


