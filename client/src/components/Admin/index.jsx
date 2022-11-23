import * as React from "react";
import styled from "styled-components";
import {Outlet} from "react-router-dom";
import {Sidebar} from "./Sidebar";
import {AdminRouteNames, RouteNames} from "../../Router";
import {Chat, Feedback, Home, News, Order, Product, ProductCategory, ProductFeature, User} from "./Icons";

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
                {name: 'Пользователи', pathname: AdminRouteNames.ADMIN_USERS, icon: <User/>},
            ]
        }, {
            name: 'Продуктовая информация',
            items: [
                {name: 'Товары', pathname: AdminRouteNames.ADMIN_PRODUCT, icon: <Product/>},
                {name: 'Категории товаров', pathname: AdminRouteNames.ADMIN_PRODUCT_CATEGORY, icon: <ProductCategory/>},
                {name: 'Характеристики товаров', pathname: AdminRouteNames.ADMIN_PRODUCT_FEATURE, icon: <ProductFeature/>},
                {name: 'Новости', pathname: AdminRouteNames.ADMIN_NEWS, icon: <News/>},
                {name: 'Заказы', pathname: AdminRouteNames.ADMIN_ORDER, icon: <Order/>},
            ]
        }, {
            name: 'Связь с пользователями',
            items: [
                {name: 'Чат поддержки', pathname: AdminRouteNames.ADMIN_CHAT, icon: <Chat/>},
                {name: 'Обратная связь', pathname: AdminRouteNames.ADMIN_FEEDBACK, icon: <Feedback/>},
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
  margin-left: 350px;
  width: 100%;
`