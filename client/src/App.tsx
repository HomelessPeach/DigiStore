import * as React from "react";
import {ThemeProvider} from "styled-components";
import {Router} from "./Router";
import {Theme, Styles} from "./styles";
import "./App.css"

export const App = () => {
    return (
        <ThemeProvider theme={Theme}>
            <Styles/>
            <Router/>
        </ThemeProvider>
    );
}