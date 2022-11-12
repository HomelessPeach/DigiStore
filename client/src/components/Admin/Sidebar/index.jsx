import * as React from "react";
import {useState, useEffect} from "react";
import "./Sidebar.css"

export const Sidebar = () => {

    const [height, setHeight] = useState((document.body.clientHeight === window.innerHeight)? 289 : 0)

    const footerHeight = () => {
        console.log(document.body.clientHeight, window.innerHeight, window.scrollY)
        setHeight((document.body.clientHeight - window.innerHeight - window.scrollY > 200)? 0 : 289 - document.body.clientHeight + window.innerHeight + window.scrollY)
    }

    useEffect(()=>{
        window.addEventListener("scroll", footerHeight);
        return () => window.removeEventListener("scroll", footerHeight)
    }, [])

    return (
        <div className={'sidebar-container'} style={{
           height: window.innerHeight - height
        }}>
            <div>Пользователи</div>
            <div>Продукция</div>
        </div>
    )
}