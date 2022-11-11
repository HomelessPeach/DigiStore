import * as React from "react";
import {HeaderBasket} from "./HeaderBasket";
import {HeaderProfile} from "./HeaderProfile";
import "./HeaderPersonalNavbar.css"

export const HeaderPersonalNavbar = () => {

    return(
        <div className={'header-personal-navbar'}>
            <HeaderBasket/>
            <HeaderProfile/>
        </div>
    )
}