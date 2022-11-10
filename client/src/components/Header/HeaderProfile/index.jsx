import {NavLink} from "react-router-dom";
import {attributeFilesUrl} from "../../../services";
import {RouteNames} from "../../../Router";
import "./HeaderProfile.css"

export const HeaderProfile = () => {
    return (
        <NavLink
            to={RouteNames.HOME}
            title="На главную"
            className={'header-profile'}
            // className={({isActive}) => (isActive) ? 'HeaderLogo_active' : 'HeaderLogo'}
        >
            <img src={`${attributeFilesUrl}/profile.svg`}/>
        </NavLink>
    )
}