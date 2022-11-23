import {Routes, Route} from "react-router-dom";
import {Layout} from "./Layout";
import {Home} from "../components/Home";
import {Product} from "../components/Product";
import {Admin} from "../components/Admin";
import {Profile} from "../components/Profile";
import {Basket} from "../components/Basket";
import {AdminHomePage} from "../components/Admin/AdminHomePage";
import {ChatList, ChatShow} from "../components/Admin/Tables/Chats";
import {FeedbackList, FeedbackShow} from "../components/Admin/Tables/Feedbacks";
import {NewsCreate, NewsEdit, NewsList, NewsShow} from "../components/Admin/Tables/News";
import {OrderList, OrderShow} from "../components/Admin/Tables/Orders";
import {
    ProductCategoryCreate,
    ProductCategoryEdit,
    ProductCategoryList,
    ProductCategoryShow
} from "../components/Admin/Tables/ProductCategories";
import {
    ProductFeatureShow,
    ProductFeatureList,
    ProductFeatureEdit,
    ProductFeatureCreate
} from "../components/Admin/Tables/ProductFeatures";
import {ProductsList, ProductShow, ProductEdit, ProductCreate} from "../components/Admin/Tables/Products";
import {UserEdit, UserList, UserShow, UserCreate} from "../components/Admin/Tables/Users";

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
                <Route path={RouteNames.ADMIN} element={<Admin/>}>
                    <Route index element={<AdminHomePage/>}/>
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