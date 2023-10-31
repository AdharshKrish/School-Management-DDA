require('file-loader?name=[name].[ext]!./index.html')
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {BrowserRouter} from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./store/reducers"
import thunk from "redux-thunk"

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<Provider store={store}>
    <App />
</Provider>)