import {NavLink} from "react-router-dom";
import {attributeFilesUrl} from "../../../services";
import {RouteNames} from "../../../Router";
import "./HeaderLogo.css"

export const HeaderLogo = () => {
    return (
        <NavLink
            to={RouteNames.HOME}
            title="На главную"
            className={'header-logo'}
            // className={({isActive}) => (isActive) ? 'HeaderLogo_active' : 'HeaderLogo'}
        >
            <img src={`${attributeFilesUrl}/logo.svg`}/>
        </NavLink>
    )
}