import {NavLink} from "react-router-dom";
import {attributeFilesUrl} from "../../../services";
import {RouteNames} from "../../../Router";
import "./HeaderBasket.css"

export const HeaderBasket = () => {
    return (
        <NavLink
            to={RouteNames.HOME}
            title="На главную"
            className={'header-basket'}
            // className={({isActive}) => (isActive) ? 'HeaderLogo_active' : 'HeaderLogo'}
        >
            <img src={`${attributeFilesUrl}/basket.svg`}/>
        </NavLink>
    )
}