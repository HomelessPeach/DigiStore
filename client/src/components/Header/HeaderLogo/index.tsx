import * as React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {attributeFilesUrl} from "../../../services";
import {RouteNames} from "../../../Router";

export const HeaderLogo = () => {
    return (
        <NavLinkBlock
            to={RouteNames.HOME}
            title="На главную"
        >
            <Logo src={`${attributeFilesUrl}/logo2.svg`}/>
        </NavLinkBlock>
    )
}

const NavLinkBlock = styled(NavLink)`
  height: ${({theme}) => theme.size.header.height}px;
  padding: 5px 10px;
  cursor: pointer;
  &.active {
    pointer-events: none;
  }
`

const Logo = styled.img`
  height: 100%;
`