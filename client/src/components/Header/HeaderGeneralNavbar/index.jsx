import * as React from "react";
import {NavLink} from "react-router-dom";
import "./HeaderGeneralNavbar.css";

export const HeaderGeneralNavbar = (props) => {

    const {
        items
    } = props

    return (
        <div className={'header-general-navbar'}>
            {
                items.map((item) =>
                    <NavLink
                        to={item.pathname}
                        title={item.name}
                        className={({isActive}) => (isActive) ? 'header-general-navbar-item' : 'header-general-navbar-item'}
                    >
                        {item.name}
                    </NavLink>
                )
            }
        </div>
    )
}