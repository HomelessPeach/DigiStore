import {Routes, Route} from "react-router-dom";
import {Layout} from "./Layout";
import {AdminLayout} from "./AdminLayout";
import {NotFound} from "../pages/NotFound";
import {Home} from "../pages/Home";
import {Product, ProductCard, ProductCategory} from "../pages/Product";
import {Profile} from "../pages/Profile";
import {Basket} from "../pages/Basket";
import {NewsCard} from "../pages/News";
import {
    AdminNotFound,
    AdminHome,
    ChatList,
    ChatShow,
    FeedbackList,
    FeedbackShow,
    NewsCreate,
    NewsEdit,
    NewsList,
    NewsShow,
    OrderList,
    OrderShow,
    ProductCategoryCreate,
    ProductCategoryEdit,
    ProductCategoryList,
    ProductCategoryShow,
    ProductFeatureShow,
    ProductFeatureList,
    ProductFeatureEdit,
    ProductFeatureCreate,
    ProductsList,
    ProductShow,
    ProductEdit,
    ProductCreate,
    UserEdit,
    UserList,
    UserShow,
    UserCreate} from "../pages/Admin";
import {Feedback} from "../pages/Feedback";
import {Registration} from "../pages/Registration";
import {ForgotPassword} from "../pages/ForgotPassword";

export const RouteNames = {
    HOME: '/',
    ADMIN: '/admin',
    PROFILE: '/profile',
    BASKET: '/basket',
    PRODUCT: '/product',
    NEWS: '/news',
    FEEDBACK: '/feedback',
    REGISTRATION: '/registration',
    FORGOT_PASSWORD: '/forgot_password',
    NOT_FOUND: '/*'
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
    ADMIN_NOT_FOUND: `${RouteNames.ADMIN}/*`
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
                    <Route path={`${AdminRouteNames.ADMIN_USERS}/:id/edit`} element={<UserEdit/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_USERS}/new`} element={<UserCreate/>}/>
                    <Route path={AdminRouteNames.ADMIN_PRODUCT} element={<ProductsList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT}/:id`} element={<ProductShow/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT}/:id/edit`} element={<ProductEdit/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT}/new`} element={<ProductCreate/>}/>
                    <Route path={AdminRouteNames.ADMIN_PRODUCT_CATEGORY} element={<ProductCategoryList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/:id`} element={<ProductCategoryShow/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/:id/edit`} element={<ProductCategoryEdit/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/new`} element={<ProductCategoryCreate/>}/>
                    <Route path={AdminRouteNames.ADMIN_PRODUCT_FEATURE} element={<ProductFeatureList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/:id`} element={<ProductFeatureShow/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/:id/edit`} element={<ProductFeatureEdit/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/new`} element={<ProductFeatureCreate/>}/>
                    <Route path={AdminRouteNames.ADMIN_NEWS} element={<NewsList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_NEWS}/:id`} element={<NewsShow/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_NEWS}/:id/edit`} element={<NewsEdit/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_NEWS}/new`} element={<NewsCreate/>}/>
                    <Route path={AdminRouteNames.ADMIN_ORDER} element={<OrderList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_ORDER}/:id`} element={<OrderShow/>}/>
                    <Route path={AdminRouteNames.ADMIN_CHAT} element={<ChatList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_CHAT}/:id`} element={<ChatShow/>}/>
                    <Route path={AdminRouteNames.ADMIN_FEEDBACK} element={<FeedbackList/>}/>
                    <Route path={`${AdminRouteNames.ADMIN_FEEDBACK}/:id`} element={<FeedbackShow/>}/>
                    <Route path={AdminRouteNames.ADMIN_NOT_FOUND} element={<AdminNotFound/>}/>
                </Route>
                <Route path={RouteNames.PROFILE} element={<Profile/>}/>
                <Route path={RouteNames.BASKET} element={<Basket/>}/>
                <Route path={RouteNames.PRODUCT} element={<ProductCategory/>}/>
                <Route path={`${RouteNames.PRODUCT}/category/:categoryId`} element={<Product/>}/>
                <Route path={`${RouteNames.PRODUCT}/show/:id`} element={<ProductCard/>}/>
                <Route path={`:id${RouteNames.NEWS}`} element={<NewsCard/>}/>
                <Route path={`/${RouteNames.FEEDBACK}`} element={<Feedback/>}/>
                <Route path={`/${RouteNames.REGISTRATION}`} element={<Registration/>}/>
                <Route path={`/${RouteNames.FORGOT_PASSWORD}`} element={<ForgotPassword/>}/>
                <Route path={RouteNames.NOT_FOUND} element={<NotFound/>}/>
            </Route>
        </Routes>
    )
}