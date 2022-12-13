import * as React from "react";
import styled from "styled-components";
import {MenuItems} from "./MenuItems";

export const Sidebar = (props) => {

    const {
        items
    } = props

    return (
        <SidebarContainer>
            <MenuItems items={items}/>
        </SidebarContainer>
    )
}

const SidebarContainer = styled.div`
  --sidebar-width: 350px;
  --sidebar-font-size: 18px;
  --item-padding-vertical: 8px;
  --icon-height: calc(var(--sidebar-font-size) + var(--item-padding-vertical) - 1px);
  background-color: ${({theme}) => theme.colors.secondary};
  width: var(--sidebar-width);
  position: fixed;
  display: flex;
  top: ${({theme}) => theme.size.header.height}px;
  bottom: 0;
  flex-direction: column;
  padding: 20px 0 20px 0;
  border-right: 1px solid black;
  z-index: 1;
  user-select: none;
`