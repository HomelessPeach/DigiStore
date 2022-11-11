import * as React from "react";
import {NavLink} from "react-router-dom";
import {attributeFilesUrl} from "../../../../services";
import {RouteNames} from "../../../../Router";
import "./HeaderBasket.css"

export const HeaderBasket = () => {
    return (
        <NavLink
            to={RouteNames.BASKET}
            title="На главную"
            className={({isActive}) => (isActive) ? 'header-basket header-basket-active' : 'header-basket header-basket-disable'}
        >
            <img src={`${attributeFilesUrl}/basket.svg`}/>
        </NavLink>
    )
}