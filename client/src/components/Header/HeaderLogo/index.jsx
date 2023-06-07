import * as React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {attributeFilesUrl} from "../../../services";
import {RouteNames} from "../../../Router";
import {useResponsive} from "../../../hook/responsive";

export const HeaderLogo = () => {

    const {smallMobile} = useResponsive()

    return (
        <NavLinkBlock
            to={RouteNames.HOME}
            title="На главную"
        >
            {(smallMobile)?
                <SmallLogo src={`${attributeFilesUrl}/logo.svg`}/>
                : <Logo src={`${attributeFilesUrl}/logo2.svg`}/>
            }
        </NavLinkBlock>
    )
}

const NavLinkBlock = styled(NavLink)`
  height: ${({theme}) => theme.size.header.height}px;
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    pointer-events: none;
  }
`

const Logo = styled.img`
  height: 100%;
`

const SmallLogo = styled.img`
  height: 90%;
`