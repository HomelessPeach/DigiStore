import * as React from "react";
import {attributeFilesUrl} from "../../../../services";
import {ProfileNavbar} from "./ProfileNavbar";
import {useState} from "react";
import "./HeaderProfile.css"

export const HeaderProfile = () => {

    const [openProfileNavbar, setOpenProfileNavbar] = useState(false)

    return (
        <>
            <div className={'header-profile'} onClick={() => setOpenProfileNavbar(!openProfileNavbar)}>
                <img src={`${attributeFilesUrl}/profile.svg`}/>
            </div>
            <ProfileNavbar isOpen={openProfileNavbar} setIsOpen={setOpenProfileNavbar}/>
        </>
    )
}