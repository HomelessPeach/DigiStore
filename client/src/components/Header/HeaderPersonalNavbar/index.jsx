import * as React from "react";
import styled from "styled-components";
import {HeaderBasket} from "./HeaderBasket";
import {HeaderProfile} from "./HeaderProfile";

export const HeaderPersonalNavbar = () => {

    return(
        <HeaderPersonalNavbarBlock>
            <HeaderBasket/>
            <HeaderProfile/>
        </HeaderPersonalNavbarBlock>
    )
}

const HeaderPersonalNavbarBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  min-width: 130px;
  width: 20%;
  height: ${({theme}) => theme.size.header.height}px;
  padding: 15px 10px;
  @media (${({theme}) => theme.media.medium}) {
    min-width: 110px;
  }
  @media (${({theme}) => theme.media.small}) {
    min-width: 100px;
  }
`