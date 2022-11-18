import {FC} from 'react';
import * as React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {LinkItem} from '../index';

interface HeaderGeneralNavbarProps {
    items: LinkItem[]
}

export const HeaderGeneralNavbar: FC<HeaderGeneralNavbarProps> = (props) => {

    const {
        items
    } = props

    return (
        <HeaderGeneralNavbarBlock>
            {
                items.map((item) =>
                    <NavLinkBlock
                        to={item.pathname}
                        title={item.name}
                   >
                        {item.name}
                    </NavLinkBlock>
                )
            }
        </HeaderGeneralNavbarBlock>
    )
}

const HeaderGeneralNavbarBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  min-width: 150px;
  width: 50%;
  height: ${({theme}) => theme.size.header.height}px;
  padding: 15px 10px;
`

const NavLinkBlock = styled(NavLink)`
  font-size: 20px;
  color: ${({theme}) => theme.colors.secondary};
  text-decoration: none;
  padding: 5px 10px;
  margin: 3px 0;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
    border-radius: 10px;
  }
  &.active {
    pointer-events: none;
  }
}`