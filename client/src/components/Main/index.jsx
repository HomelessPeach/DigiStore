import * as React from "react";
import styled from "styled-components"
import {Outlet} from "react-router-dom";


export const Main = () => {

    return (
        <MainBlock id={'main'}>
            <MainContainer>
                <Outlet/>
            </MainContainer>
        </MainBlock>
    )
}

const MainBlock = styled.main`
  background-color: ${({theme}) => theme.colors.secondary};
  min-height: calc(100vh - ${({theme}) => theme.size.header.height}px);
`

const MainContainer = styled.div`
  background-color: ${({theme}) => theme.colors.secondary};
  min-height: calc(100vh - ${({theme}) => theme.size.header.height}px);
`