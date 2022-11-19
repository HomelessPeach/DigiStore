import {Routes, Route} from "react-router-dom";
import {Layout} from "./Layout";
import {Home} from "../components/Home";
import {Product} from "../components/Product";
import {Admin} from "../components/Admin";
import {Profile} from "../components/Profile";
import {Basket} from "../components/Basket";
import {UsersList} from "../components/Admin/Tables/Users";

export const RouteNames = {
    HOME: '/',
    ADMIN: '/admin',
    PROFILE: '/profile',
    BASKET: '/basket',
    PRODUCT: '/product'
}

export const AdminRouteNames = {
    ADMIN_PRODUCT: {
        LIST: `${RouteNames.ADMIN}/products`
    },
    ADMIN_USERS: {
        LIST: `${RouteNames.ADMIN}/users`
    },
}

export const Router = () => {
    return (
        <Routes>
            <Route path={RouteNames.HOME} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={RouteNames.ADMIN} element={<Admin/>}>
                    <Route index element={<Home/>}/>
                    <Route path={AdminRouteNames.ADMIN_USERS.LIST} element={<UsersList/>}/>
                    <Route path={AdminRouteNames.ADMIN_PRODUCT.LIST} element={<Product/>}/>
                </Route>
                <Route path={RouteNames.PROFILE} element={<Profile/>}/>
                <Route path={RouteNames.BASKET} element={<Basket/>}/>
                <Route path={RouteNames.PRODUCT} element={<Product/>}/>
            </Route>
        </Routes>
    )
}