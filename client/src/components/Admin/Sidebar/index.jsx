import * as React from "react";
import styled from "styled-components";
import {MenuItems} from "./MenuItems";

export const Sidebar = (props) => {

    const {
        items
    } = props

    return (
        <SidebarWrapper>
            <SidebarContainer>
                <MenuItems items={items}/>
            </SidebarContainer>
        </SidebarWrapper>
    )
}

const SidebarWrapper = styled.div`
  --sidebar-width: 350px;
  --sidebar-font-size: 18px;
  --item-padding-vertical: 8px;
  --icon-height: calc(var(--sidebar-font-size) + var(--item-padding-vertical) - 1px);
  width: var(--sidebar-width);
  border-right: 1px solid black;
  position: relative;
  top: 0;
  bottom: 0;
`

const SidebarContainer = styled.div`
  background-color: ${({theme}) => theme.colors.secondary};
  width: calc(var(--sidebar-width) - 1px);
  display: flex;
  flex-direction: column;
  padding: 20px 0 20px 0;
  position: sticky;
  top: 0;
  max-height: calc(100vh - ${({theme}) => theme.size.header.height}px);
  min-height: calc(100vh - ${({theme}) => theme.size.header.height + theme.size.footer.height}px);
  user-select: none;
  overflow: overlay;
`