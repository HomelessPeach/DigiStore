import * as React from "react";
import styled from "styled-components";
import {Outlet} from "react-router-dom";
import {Sidebar} from "./Sidebar";
import {AdminRouteNames, RouteNames} from "../../Router";
import {Home, User, Product} from "./Sidebar/Icons";

export const Admin = () => {

    const links = [
        {
            name: 'Общая информация',
            pathname: RouteNames.ADMIN,
            icon: <Home/>
        },
        {
            name: 'Системное',
            items: [
                {name: 'Пользователи', pathname: AdminRouteNames.ADMIN_USERS.LIST, icon: <User/>},
            ]
        }, {
            name: 'Продукты',
            items: [
                {name: 'Продукция', pathname: AdminRouteNames.ADMIN_PRODUCT.LIST, icon: <Product/>},
            ]
        },
    ]

    return (
        <AdminContainer>
            <Sidebar items={links}/>
            <AdminContentBlock>
                <Outlet/>
            </AdminContentBlock>
        </AdminContainer>
    )
}

const AdminContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`

const AdminContentBlock = styled.div`
  padding: 20px;
  margin-left: 250px;
  width: 100%;
`