import * as React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const HeaderGeneralNavbar = (props) => {

    const {
        items
    } = props

    return (
        <HeaderGeneralNavbarBlock>
            {
                items.map((item, index) =>
                    <NavLinkBlock
                        key={index}
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