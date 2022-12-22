import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {HeaderLogo} from "./HeaderLogo";
import {HeaderPersonalNavbar} from "./HeaderPersonalNavbar";
import {HeaderGeneralNavbar} from "./HeaderGeneralNavbar";
import {RouteNames} from "../../Router";
import {Theme} from "../../styles";
import {attributeFilesUrl} from "../../services";


export const Header = () => {

    const {
        pathname
    } = useLocation()

    const links = [
        {name: 'Продукция', pathname: RouteNames.PRODUCT}
    ]

    const [height, setHeight] = useState((Theme.size.header.maxHeight - window.scrollY > Theme.size.header.height)? Theme.size.header.maxHeight - window.scrollY : Theme.size.header.height)

    useEffect(() => {


        function scrollHandler() {
            setHeight((Theme.size.header.maxHeight - window.scrollY > Theme.size.header.height)? Theme.size.header.maxHeight - window.scrollY : Theme.size.header.height)
        }

        window.addEventListener("scroll", scrollHandler);

        return () => window.removeEventListener("scroll", scrollHandler)
    }, [pathname])

    return (
        <HeaderBlock id={'header'}>
            {(height !== Theme.size.header.height && pathname === '/')?
                <HeaderLargeContainer id={'header1'} height={height}>
                    <ImageBlock height={height}>
                        <Img src={`${attributeFilesUrl}/logo2.svg`}/>
                    </ImageBlock>
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

const HeaderBlock = styled.header`
  width: 100%;
  position: fixed;
  user-select: none;
  z-index: 3;
`

const HeaderLargeContainer = styled.div`
  height: ${({height}) => height}px;
  min-height: ${({theme}) => theme.size.height}px;
  background-color: ${({theme}) => theme.colors.primary};
  transition: 0s;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const ImageBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({theme}) => theme.size.header.maxHeight}px;
  width: 1000px;
  color: #ffffff;
  position: fixed;
  top: ${({theme, height}) => height - theme.size.header.maxHeight}px;
`