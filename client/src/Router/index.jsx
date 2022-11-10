import {Routes, Route} from "react-router-dom";
import {Layout} from "./Layout";
import {Home} from "../components/Home";
import {Product} from "../components/Product";

export const RouteNames = {
    HOME: '/',
    PRODUCT: 'product'
}

export const Router = () => {
    return (
        <Routes>
            <Route path={RouteNames.HOME} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={RouteNames.PRODUCT} element={<Product/>}/>
            </Route>
        </Routes>
    )
}