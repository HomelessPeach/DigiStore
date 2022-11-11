import * as React from "react";
import {useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import "./Main.css"

export const Main = () => {

    const {pathname} = useLocation()

    const [paddingTop, setPadding] = useState(document.querySelectorAll("#header .header-container")[0]?.offsetHeight)

    useEffect(() => {
        setPadding(document.querySelectorAll("#header .header-container")[0]?.offsetHeight)
    }, [pathname === '/'])

    return (
        <main id={'main'} style={{paddingTop: paddingTop}}>
            <div className={'main-content'}>
                <Outlet/>
            </div>
        </main>
    )
}