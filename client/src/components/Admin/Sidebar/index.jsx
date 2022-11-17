import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {NavLink} from "react-router-dom";
import {Arrow} from "./Icons";

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
        paddingLeft = 0,
    } = props

    return (
        items.map((item) =>
            (item.pathname) ?
                <NavLinkBlock
                    to={item.pathname}
                    title={item.name}
                    paddingLeft={paddingLeft + 10}
                >
                    <IconBlock>
                        {item.icon}
                    </IconBlock>
                    <TextBlock>
                        {item.name}
                    </TextBlock>
                </NavLinkBlock>
                :
                <MenuTitleGroupItem item={item} paddingLeft={paddingLeft}/>
        )
    )
}

const MenuTitleGroupItem = (props) => {

    const {
        item,
        paddingLeft
    } = props

    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <MenuTitleBlock onClick={() => setOpen(!isOpen)} isOpen={isOpen} paddingLeft={paddingLeft + 10}>
                <IconBlock>
                    <IconTitleGroupBlock isOpen={isOpen}>
                        <Arrow/>
                    </IconTitleGroupBlock>
                </IconBlock>
                <TextBlock>
                    {item.name}
                </TextBlock>
            </MenuTitleBlock>
            {(isOpen)?
                <SidebarGroupWrapper>
                    <MenuItems items={item.items} paddingLeft={paddingLeft + 10}/>
                </SidebarGroupWrapper>
                : null
            }
        </>
    )
}

const SidebarContainer = styled.div`
  --sidebar-width: 250px;
  --sidebar-font-size: 18px;
  --item-padding-vertical: 7px;
  --icon-height: calc(var(--sidebar-font-size) + var(--item-padding-vertical) - 1px);
  background-color: ${({theme}) => theme.colors.secondary};
  width: var(--sidebar-width);
  position: fixed;
  display: flex;
  height: calc(100vh - ${({theme}) => theme.size.header.height}px);
  flex-direction: column;
  padding: 20px 0 20px 0;
  border-right: 1px solid black;
  z-index: 0;
  user-select: none;
`

const NavLinkBlock = styled(NavLink)`
  width: var(--sidebar-width);
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: var(--sidebar-font-size);
  text-decoration: none;
  padding: var(--item-padding-vertical) 10px var(--item-padding-vertical) ${({paddingLeft}) => paddingLeft}px;
  color: #000000;
  &:focus {
    border-right: 3px solid ${({theme}) => theme.colors.tertiary};
    background-color: #c7c7c7;
    color: ${({theme}) => theme.colors.tertiary};
    fill: ${({theme}) => theme.colors.tertiary};
  }
}`

const MenuTitleBlock = styled.div`
  --padding-top-bootom: 5px;
  width: 100%;
  font-size: var(--sidebar-font-size);
  padding: var(--item-padding-vertical) 10px var(--item-padding-vertical) ${({paddingLeft}) => paddingLeft}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: ${({theme}) => theme.fonts.mainFont};
  background-color: ${({theme, isOpen}) => (isOpen)? 'rgba(177, 58, 142, 0.5)': theme.colors.secondary};
}
`

const SidebarGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
`

const IconTitleGroupBlock = styled.div`
  height: 100%;
  transform: rotate(${({isOpen}) => (isOpen) ? 90: 0}deg);
  transition: transform 0.2s ease-out;
`

const IconBlock = styled.div`
  width: 15%;
  height: var(--icon-height);
  display: flex;
  align-items: center;
`

const TextBlock = styled.div`
  width: 85%;
`