import * as React from "react";
import styled from "styled-components";
import {useState} from "react";
import {attributeFilesUrl} from "../../../../services";
import {ProfileNavbar} from "./ProfileNavbar";


export const HeaderProfile = () => {

    const [openProfileNavbar, setOpenProfileNavbar] = useState(false)

    return (
        <>
            <HeaderProfileBlock onClick={() => setOpenProfileNavbar(!openProfileNavbar)}>
                <ProfileImage src={`${attributeFilesUrl}/profile.svg`}/>
            </HeaderProfileBlock>
            <ProfileNavbar isOpen={openProfileNavbar} setIsOpen={setOpenProfileNavbar}/>
        </>
    )
}

const HeaderProfileBlock = styled.div`
  width: 50px;
  display: flex;
  align-items: end;
  cursor: pointer;
`

const ProfileImage = styled.img`
  width: 100%
`