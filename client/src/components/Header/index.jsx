import * as React from "react";
import styled from "styled-components"
import {HeaderLogo} from "./HeaderLogo";
import {HeaderPersonalNavbar} from "./HeaderPersonalNavbar";
import {HeaderGeneralNavbar} from "./HeaderGeneralNavbar";
import {RouteNames} from "../../Router";
import {Theme} from "../../styles";


export const Header = () => {

    const links = [
        {name: 'Продукция', pathname: RouteNames.PRODUCT}
    ]

    return (
        <HeaderBlock id={'header'}>
            <HeaderContainer id={'header1'} height={Theme.size.header.height}>
                <HeaderLogo/>
                <HeaderGeneralNavbar items={links}/>
                <HeaderPersonalNavbar/>
            </HeaderContainer>
        </HeaderBlock>
    )
}

const HeaderBlock = styled.header`
  width: 100%;
  user-select: none;
  position: relative;
  z-index: 5;
`

const HeaderContainer = styled.div`
  height: ${({height}) => height}px;
  min-height: ${({theme}) => theme.size.height}px;
  background-color: ${({theme}) => theme.colors.primary};
  transition: 0s;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 0 7vw;
`