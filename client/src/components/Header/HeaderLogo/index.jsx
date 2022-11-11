import * as React from "react";
import {NavLink} from "react-router-dom";
import {attributeFilesUrl} from "../../../services";
import {RouteNames} from "../../../Router";
import "./HeaderLogo.css"

export const HeaderLogo = () => {
    return (
        <NavLink
            to={RouteNames.HOME}
            title="На главную"
            className={({isActive}) => (isActive) ? 'header-logo header-logo-active' : 'header-logo header-logo-disable'}
        >
            <img src={`${attributeFilesUrl}/logo2.svg`}/>
        </NavLink>
    )
}