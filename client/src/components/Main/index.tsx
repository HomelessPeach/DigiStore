import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Theme} from '../../styles';


export const Main = () => {

    const {pathname} = useLocation()

    const [paddingTop, setPadding] = useState<number>(document.getElementById("header")?.offsetHeight || Theme.size.header.height)

    useEffect(() => {
        setTimeout(()=>{
            setPadding(document.getElementById("header")?.offsetHeight || Theme.size.header.height)
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

interface MainBlockProps {
    paddingTop: number
}

const MainBlock = styled.main<MainBlockProps>`
  padding-top: ${({paddingTop}) => paddingTop}px;
  min-height: calc(100vh - ${({theme}) => theme.size.footer.height}px);
  background-color: ${({theme}) => theme.colors.secondary};
`

const MainContainer = styled.main`

`