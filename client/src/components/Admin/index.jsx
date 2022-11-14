import * as React from "react";
import styled from "styled-components";
import {Outlet} from "react-router-dom";
import {Sidebar} from "./Sidebar";
import {AdminRouteNames} from "../../Router";

export const Admin = () => {

    const links = [
        {
            name: 'Системное',
            items: [
                {name: 'Пользователи', pathname: AdminRouteNames.ADMIN_USERS.LIST},
            ]
        }, {
            name: 'Продукты',
            items: [
                {name: 'Продукция', pathname: AdminRouteNames.ADMIN_PRODUCT.LIST},
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