import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {HeaderLogo} from "./HeaderLogo";
import {HeaderPersonalNavbar} from "./HeaderPersonalNavbar";
import {HeaderGeneralNavbar} from "./HeaderGeneralNavbar";
import {RouteNames} from "../../Router";
import {Theme} from "../../styles";

export interface LinkItem {
    name: string
    pathname: string
}

export const Header = () => {

    const {
        pathname
    } = useLocation()

    const links: LinkItem[] = [
        {name: 'Продукция', pathname: RouteNames.PRODUCT}
    ]

    const [height, setHeight] = useState((Theme.size.header.maxHeight - window.scrollY > Theme.size.header.height)? Theme.size.header.maxHeight - window.scrollY : Theme.size.header.height)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setHeight((Theme.size.header.maxHeight - window.scrollY > Theme.size.header.height)? Theme.size.header.maxHeight - window.scrollY : Theme.size.header.height)
        });
    }, [pathname])

    return (
        <HeaderBlock id={'header'}>
            {(height !== Theme.size.header.height && pathname === '/')?
                <HeaderLargeContainer id={'header1'} height={height}>
                    <div style={{width: 800, height: Theme.size.header.maxHeight, color: "white", fontSize: 55, position: "fixed", top: height - Theme.size.header.maxHeight}}>
                        Здесь должна находиться информация о сайте, но по каким-то причинам она отсутствует. Разработчик в этом не виноват
                    </div>
                </HeaderLargeContainer>
                : <HeaderContainer id={'header1'} height={Theme.size.header.height}>
                    <HeaderLogo/>
                    <HeaderGeneralNavbar items={links}/>
                    <HeaderPersonalNavbar/>
                </HeaderContainer>
            }
        </HeaderBlock>
    )
}

interface HeaderContainerProps {
    theme: any;
    height: number
}

const HeaderBlock = styled.header`
  width: 100%;
  position: fixed;
  user-select: none;
`

const HeaderLargeContainer = styled.div`
  height: ${({height}: HeaderContainerProps) => height}px;
  min-height: ${({theme}) => theme.size.height}px;
  background-color: ${({theme}) => theme.colors.primary};
  transition: 0s;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderContainer = styled.div`
  height: ${({height}: HeaderContainerProps) => height}px;
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



