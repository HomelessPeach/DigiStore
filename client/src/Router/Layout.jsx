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
    const [isHeader, setIsHeader] = useState(pathname !== '/')
    const ref = useRef()

    useEffect(() => {
        scrollHandler()
        ref.current.addEventListener("scroll", scrollHandler);
        return () => ref.current.removeEventListener("scroll", scrollHandler);
    }, [pathname])

    function scrollHandler() {
        if (pathname === '/' && ref.current.scrollTop < Theme.size.header.maxHeight - Theme.size.header.height) {
            setIsHeader(false)
            return
        }
        if (pathname === '/' && !isHeader) {
            ref.current.scrollTop = ref.current.scrollTop + Theme.size.header.height
        }
        setIsHeader(true)
    }

    return (
        <LayoutContainer id="App">
            <HeaderContainer vis={isHeader}>
                <Header/>
            </HeaderContainer>
            <ContentContainer ref={ref}>
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