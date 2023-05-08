import * as React from "react";
import styled from "styled-components";
import {Outlet} from "react-router-dom";
import {Sidebar} from "../components/Admin/Sidebar";
import {AdminRouteNames, RouteNames} from "./index";
import {Chat, Feedback, Home, News, Order, Product, ProductCategory, ProductFeature, User} from "../components/Icons";

export const AdminLayout = () => {

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
`

const AdminContentBlock = styled.div`
  padding: 20px;
  width: 100%;
  min-height: calc(100vh - ${({theme}) => theme.size.header.height}px);
`