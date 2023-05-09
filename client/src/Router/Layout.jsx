import * as React from "react";
import {useLocation} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Header} from "../components/Header";
import {Main} from "../components/Main";
import {Footer} from "../components/Footer";
import {Theme} from "../styles";
import styled from "styled-components";

export const Layout = () => {

    const {pathname} = useLocation()
    const [scroll, setScroll] = useState(0)
    const [isHeader, setIsHeader] = useState(pathname !== '/')

    function scrollHandler() {
        setScroll(document.getElementById("Content").scrollTop || 0)
    }

    useEffect(() => {
        if (pathname === '/') {
            setIsHeader(false)
        } else {
            setIsHeader(true)
        }
        scrollHandler()
        document.getElementById("Content").addEventListener("scroll", scrollHandler);
        return () => document.getElementById("Content").removeEventListener("scroll", scrollHandler);
    }, [pathname])

    useEffect(() => {
        if (pathname === '/' && (scroll < (Theme.size.header.maxHeight - Theme.size.header.height) || (scroll < Theme.size.header.maxHeight && isHeader))) {
            setIsHeader(false)
            return
        }
        setIsHeader(true)
    }, [scroll])

    useEffect(() => {
        if (isHeader) {
            document.getElementById("Content").scrollTop = document.getElementById("Content").scrollTop + Theme.size.header.height
        } else {
            document.getElementById("Content").scrollTop = document.getElementById("Content").scrollTop - Theme.size.header.height
        }
    }, [isHeader])

    return (
        <LayoutContainer id={'App'}>
            <HeaderContainer vis={isHeader}>
                <Header/>
            </HeaderContainer>
            <ContentContainer id={'Content'}>
                <Main/>
                <Footer/>
            </ContentContainer>
        </LayoutContainer>
    )
}

const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const HeaderContainer = styled.div`
  visibility: ${({vis}) => (vis)? 'visible' : 'hidden'};
  max-height: ${({vis}) => (vis)? '100%' : '0px'};
`

const ContentContainer = styled.div`
  overflow: overlay;
`