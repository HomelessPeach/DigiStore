import {Routes, Route} from "react-router-dom";
import {Layout} from "./Layout";
import {Home} from "../components/Home";
import {Product} from "../components/Product";

export const Router = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={'/product'} element={<Product/>}/>
            </Route>
        </Routes>
    )
}