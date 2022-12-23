import * as React from "react";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Header} from "../components/Header";
import {Main} from "../components/Main";
import {Footer} from "../components/Footer";
import {Theme} from "../styles";

export const Layout = () => {

    const {pathname} = useLocation()
    const [isHeader, setIsHeader] = useState(false)

    useEffect(() => {
        scrollHandler()
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [pathname])

    function scrollHandler() {
        if (pathname === '/' && window.scrollY < Theme.size.header.maxHeight - Theme.size.header.height) {
            setIsHeader(false)
            return
        }
        setIsHeader(true)
    }

    return (
        <div id="App">
            {isHeader && <Header/>}
            <Main/>
            <Footer/>
        </div>
    )
}