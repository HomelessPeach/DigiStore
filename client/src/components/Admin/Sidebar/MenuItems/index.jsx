import * as React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {MenuGroupItem} from "./MenuGroupItem";

export const MenuItems = (props) => {
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
                <MenuGroupItem item={item} paddingLeft={paddingLeft}/>
        )
    )
}

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

const IconBlock = styled.div`
  width: 15%;
  height: var(--icon-height);
  display: flex;
  align-items: center;
`

const TextBlock = styled.div`
  width: 85%;
`