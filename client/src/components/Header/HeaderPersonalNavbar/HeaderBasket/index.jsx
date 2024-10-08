import * as React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {RouteNames} from "../../../../Router";

export const HeaderBasket = () => {
    return (
        <NavLinkBlock
            to={RouteNames.BASKET}
            title="Корзина"
        >
            <BasketImage viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M774.144 951.296H249.856c-67.584 0-124.928-53.248-130.048-120.832l-41.984-573.44h866.304l-41.984 573.44c-3.072 67.584-60.416 120.832-128 120.832zM166.912 338.944l34.816 485.376c2.048 24.576 22.528 44.032 48.128 44.032h524.288c24.576 0 46.08-19.456 48.128-44.032l34.816-485.376H166.912z"
                    fill=""/>
                <path
                    d="M361.472 527.36l16.384 155.648c3.072 24.576-15.36 46.08-39.936 49.152-24.576 3.072-46.08-15.36-49.152-39.936l-16.384-155.648c-3.072-24.576 15.36-46.08 39.936-49.152 24.576-3.072 47.104 15.36 49.152 39.936zM556.032 525.312v156.672c0 24.576-19.456 44.032-44.032 44.032s-44.032-19.456-44.032-44.032V525.312c0-24.576 19.456-44.032 44.032-44.032s44.032 19.456 44.032 44.032zM750.592 536.576l-16.384 155.648c-3.072 24.576-24.576 41.984-49.152 39.936-24.576-3.072-41.984-24.576-39.936-49.152l16.384-155.648c3.072-24.576 24.576-41.984 49.152-39.936 24.576 2.048 43.008 24.576 39.936 49.152z"
                    fill=""/>
                <path
                    d="M313.344 338.944c-9.216 0-19.456-3.072-26.624-10.24-17.408-15.36-18.432-40.96-4.096-57.344L419.84 114.688c23.552-26.624 56.32-41.984 91.136-41.984 34.816-1.024 68.608 14.336 92.16 40.96l139.264 156.672c15.36 17.408 13.312 43.008-3.072 57.344-17.408 15.36-43.008 13.312-57.344-3.072L540.672 168.96c-8.192-9.216-18.432-13.312-30.72-13.312-11.264 0-22.528 5.12-29.696 13.312L344.064 324.608c-8.192 9.216-19.456 14.336-30.72 14.336z"
                    fill=""/>
                <path
                    d="M961.536 330.752H62.464c-20.48 0-36.864-16.384-36.864-36.864s16.384-36.864 36.864-36.864h898.048c20.48 0 36.864 16.384 36.864 36.864 1.024 20.48-15.36 36.864-35.84 36.864z"
                    fill=""/>
            </BasketImage>
        </NavLinkBlock>
    )
}

const NavLinkBlock = styled(NavLink)`
  width: 35px;
  display: flex;
  padding: 5px 0;
  cursor: pointer;
  &.active {
    pointer-events: none;
  }
  @media (${({theme}) => theme.media.medium}) {
    width: 30px;
  }
`

const BasketImage = styled.svg`
  width: 100%;
  fill: ${({theme}) => theme.colors.secondary};
`