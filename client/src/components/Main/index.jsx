import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";


export const Main = () => {

    const {pathname} = useLocation()

    const [paddingTop, setPadding] = useState(document.getElementById("header")?.offsetHeight)

    useEffect(() => {
        setTimeout(()=>{
            setPadding(document.getElementById("header").offsetHeight)
        }, 1)
    }, [pathname])

    return (
        <MainBlock id={'main'} paddingTop={paddingTop}>
            <MainContainer>
                <Outlet/>
            </MainContainer>
        </MainBlock>
    )
}

const MainBlock = styled.main`
  padding-top: ${({paddingTop}) => paddingTop}px;
  min-height: calc(100vh - ${({theme}) => theme.size.footer.height}px);
  background-color: ${({theme}) => theme.colors.secondary};
`

const MainContainer = styled.main`

`