import * as React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {attributeFilesUrl} from "../../../../services";
import {RouteNames} from "../../../../Router";

export const HeaderBasket = () => {
    return (
        <NavLinkBlock
            to={RouteNames.BASKET}
            title="Корзина"
        >
            <BasketImage src={`${attributeFilesUrl}/basket.svg`}/>
        </NavLinkBlock>
    )
}

const NavLinkBlock = styled(NavLink)`
  width: 50px;
  display: flex;
  align-items: end;
  cursor: pointer;
  &.active {
    pointer-events: none;
  }
`

const BasketImage = styled.img`
  width: 100%;
`