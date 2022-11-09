import * as React from "react";
import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import "./Main.css"

export const Main = () => {

    const [paddingTop, setPadding] = useState()

    useEffect(() => {
        setPadding(document.querySelectorAll("#header .header-container")[0].offsetHeight)
    }, [])

    return (
        <main id={'main'} style={{padding: `${paddingTop}px 0 0`}}>
            <div className={'main-content'}>
                <Outlet/>
            </div>
        </main>
    )
}