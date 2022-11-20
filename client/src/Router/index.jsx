import {Routes, Route} from "react-router-dom";
import {Layout} from "./Layout";
import {Home} from "../components/Home";
import {Product} from "../components/Product";
import {Admin} from "../components/Admin";
import {Profile} from "../components/Profile";
import {Basket} from "../components/Basket";
import {AdminHomePage} from "../components/Admin/AdminHomePage";
import {UserList, UserShow} from "../components/Admin/Tables/Users";
import {ProductsList, ProductShow} from "../components/Admin/Tables/Products";

export const RouteNames = {
    HOME: '/',
    ADMIN: '/admin',
    PROFILE: '/profile',
    BASKET: '/basket',
    PRODUCT: '/product'
}

export const AdminRouteNames = {
    ADMIN_CHAT: `${RouteNames.ADMIN}/chat`,
    ADMIN_FEEDBACK: `${RouteNames.ADMIN}/feedback`,
    ADMIN_NEWS: `${RouteNames.ADMIN}/news`,
    ADMIN_ORDER: `${RouteNames.ADMIN}/order`,
    ADMIN_PRODUCT: `${RouteNames.ADMIN}/product`,
    ADMIN_PRODUCT_CATEGORY: `${RouteNames.ADMIN}/product_category`,
    ADMIN_USERS: `${RouteNames.ADMIN}/user`,
}

export const Router = () => {
    return (
        <Routes>
            <Route path={RouteNames.HOME} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={RouteNames.ADMIN} element={<Admin/>}>
                    <Route index element={<AdminHomePage/>}/>

                    <Route path={AdminRouteNames.ADMIN_USERS} element={<UserList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_USERS}/:id`} element={<UserShow/>}/>

                    <Route path={AdminRouteNames.ADMIN_PRODUCT} element={<ProductsList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT}/:id`} element={<ProductShow/>}/>

                    <Route path={AdminRouteNames.ADMIN_PRODUCT_CATEGORY} element={<ProductsList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/:id`} element={<ProductShow/>}/>

                    <Route path={AdminRouteNames.ADMIN_NEWS} element={<ProductsList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_NEWS}/:id`} element={<ProductShow/>}/>

                    <Route path={AdminRouteNames.ADMIN_ORDER} element={<ProductsList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_ORDER}/:id`} element={<ProductShow/>}/>

                    <Route path={AdminRouteNames.ADMIN_CHAT} element={<ProductsList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_CHAT}/:id`} element={<ProductShow/>}/>

                    <Route path={AdminRouteNames.ADMIN_FEEDBACK} element={<ProductsList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_FEEDBACK}/:id`} element={<ProductShow/>}/>
                </Route>
                <Route path={RouteNames.PROFILE} element={<Profile/>}/>
                <Route path={RouteNames.BASKET} element={<Basket/>}/>
                <Route path={RouteNames.PRODUCT} element={<Product/>}/>
            </Route>
        </Routes>
    )
}