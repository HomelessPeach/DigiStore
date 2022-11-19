import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom"
import {App} from "./App";
import {ScrollToTop} from "./utils";
import {Provider} from 'react-redux';
import {store} from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
            <BrowserRouter>
                <ScrollToTop/>
                <App/>
            </BrowserRouter>
        </Provider>
);
