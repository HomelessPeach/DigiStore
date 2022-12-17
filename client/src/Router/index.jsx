import {Routes, Route} from "react-router-dom";
import {Layout} from "./Layout";
import {AdminLayout} from "./AdminLayout";
import {Home} from "../pages/Home";
import {Product} from "../pages/Product";
import {Profile} from "../pages/Profile";
import {Basket} from "../pages/Basket";
import {AdminHome} from "../pages/Admin/AdminHome";
import {ChatList, ChatShow} from "../pages/Admin/ChatPages";
import {FeedbackList, FeedbackShow} from "../pages/Admin/FeedbackPages";
import {NewsCreate, NewsEdit, NewsList, NewsShow} from "../pages/Admin/NewsPages";
import {OrderList, OrderShow} from "../pages/Admin/OrderPages";
import {
    ProductCategoryCreate,
    ProductCategoryEdit,
    ProductCategoryList,
    ProductCategoryShow
} from "../pages/Admin/ProductCategoryPages";
import {
    ProductFeatureShow,
    ProductFeatureList,
    ProductFeatureEdit,
    ProductFeatureCreate
} from "../pages/Admin/ProductFeaturePages";
import {ProductsList, ProductShow, ProductEdit, ProductCreate} from "../pages/Admin/ProductPages";
import {UserEdit, UserList, UserShow, UserCreate} from "../pages/Admin/UserPages";

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
    ADMIN_PRODUCT_FEATURE: `${RouteNames.ADMIN}/product_feature`,
    ADMIN_USERS: `${RouteNames.ADMIN}/user`,
}

export const Router = () => {
    return (
        <Routes>
            <Route path={RouteNames.HOME} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={RouteNames.ADMIN} element={<AdminLayout/>}>
                    <Route index element={<AdminHome/>}/>
                    <Route path={AdminRouteNames.ADMIN_USERS} element={<UserList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_USERS}/:id`} element={<UserShow/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_USERS}/edit/:id`} element={<UserEdit/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_USERS}/new`} element={<UserCreate/>}/>
                    <Route path={AdminRouteNames.ADMIN_PRODUCT} element={<ProductsList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT}/:id`} element={<ProductShow/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT}/edit/:id`} element={<ProductEdit/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT}/new`} element={<ProductCreate/>}/>
                    <Route path={AdminRouteNames.ADMIN_PRODUCT_CATEGORY} element={<ProductCategoryList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/:id`} element={<ProductCategoryShow/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/edit/:id`} element={<ProductCategoryEdit/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/new`} element={<ProductCategoryCreate/>}/>
                    <Route path={AdminRouteNames.ADMIN_PRODUCT_FEATURE} element={<ProductFeatureList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/:id`} element={<ProductFeatureShow/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/edit/:id`} element={<ProductFeatureEdit/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/new`} element={<ProductFeatureCreate/>}/>
                    <Route path={AdminRouteNames.ADMIN_NEWS} element={<NewsList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_NEWS}/:id`} element={<NewsShow/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_NEWS}/edit/:id`} element={<NewsEdit/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_NEWS}/new`} element={<NewsCreate/>}/>
                    <Route path={AdminRouteNames.ADMIN_ORDER} element={<OrderList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_ORDER}/:id`} element={<OrderShow/>}/>
                    <Route path={AdminRouteNames.ADMIN_CHAT} element={<ChatList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_CHAT}/:id`} element={<ChatShow/>}/>
                    <Route path={AdminRouteNames.ADMIN_FEEDBACK} element={<FeedbackList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_FEEDBACK}/:id`} element={<FeedbackShow/>}/>
                </Route>
                <Route path={RouteNames.PROFILE} element={<Profile/>}/>
                <Route path={RouteNames.BASKET} element={<Basket/>}/>
                <Route path={RouteNames.PRODUCT} element={<Product/>}/>
            </Route>
        </Routes>
    )
}