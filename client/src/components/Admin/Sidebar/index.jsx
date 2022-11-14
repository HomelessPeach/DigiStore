import * as React from "react";
import styled from "styled-components"
import {NavLink} from "react-router-dom";

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

const MenuItems = (props) => {
    const {
        items,
        paddingLeft = 0
    } = props

    return (
        items.map((item) =>
            (item.pathname) ?
                <NavLinkBlock
                    to={item.pathname}
                    title={item.name}
                    paddingLeft={paddingLeft + 15}
                >
                    {item.name}
                </NavLinkBlock>
                :
                <SidebarGroupWrapper>
                    <MenuTitleBlock paddingLeft={paddingLeft + 15}>
                        {item.name}
                    </MenuTitleBlock>
                    <SidebarGroupWrapper>
                        <MenuItems items={item.items} paddingLeft={paddingLeft + 15}/>
                    </SidebarGroupWrapper>
                </SidebarGroupWrapper>
        )
    )
}

const SidebarContainer = styled.div`
  --sidebar-width: 250px;
  --sidebar-font-size: 18px;
  width: var(--sidebar-width);
  position: fixed;
  display: flex;
  height: calc(100vh - var(--header-height));
  flex-direction: column;
  padding: 20px 0 20px 0;
  border-right: 1px solid black;
  z-index: 0;
`

const NavLinkBlock = styled(NavLink)`
  width: 100%;
  font-size: var(--sidebar-font-size);
  text-decoration: none;
  padding: 5px 10px 5px ${({paddingLeft}) => paddingLeft}px;
  &.active {
    border-right: 3px solid var(--main-color-3);
    background-color: #c7c7c7;
  }
}`

const MenuTitleBlock = styled.div`
  width: 100%;
  font-size: var(--sidebar-font-size);
  padding: 5px 10px 5px ${({paddingLeft}) => paddingLeft}px;
`

const SidebarGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
`