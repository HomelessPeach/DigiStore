import * as React from "react";
import {Sidebar} from "./Sidebar";
import {Outlet} from "react-router-dom";
import "./Admin.css"

export const Admin = () => {



    return (
        <div className={'admin-container'}>
            <Sidebar/>
            <div className={'admin-main-content'}>
                <Outlet/>
            </div>
        </div>
    )
}