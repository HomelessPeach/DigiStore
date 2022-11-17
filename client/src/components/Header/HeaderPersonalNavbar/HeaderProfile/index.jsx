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
                <ProfileImage viewBox="4 4 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 6c3.31 0 6 2.69 6 6 0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6zm0 28.4c-5.01 0-9.41-2.56-12-6.44.05-3.97 8.01-6.16 12-6.16s11.94 2.19 12 6.16c-2.59 3.88-6.99 6.44-12 6.44z"/>
                </ProfileImage>
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

const ProfileImage = styled.svg`
  fill: ${({theme}) => theme.colors.secondary};
  border-radius: 50px;
  background-color: ${({theme}) => theme.colors.tertiary};
`